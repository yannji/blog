package fun.yannji.blog.service.impl;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.common.constants.SettingConstants;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.vo.AttachmentSearchVO;
import fun.yannji.blog.domain.vo.AttachmentUploadVO;
import fun.yannji.blog.entity.Attachment;
import fun.yannji.blog.mapper.AttachmentMapper;
import fun.yannji.blog.service.AttachmentService;
import fun.yannji.blog.service.SettingService;
import fun.yannji.blog.util.PageUtil;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 11:29
 */

@Service
public class AttachmentServiceImpl
        extends ServiceImpl<AttachmentMapper, Attachment>
        implements AttachmentService {

    @Value("${project.upload}")
    private String uploadPath;

    @Autowired
    private SettingService settingService;

    @Override
    public String uploadAttachment(MultipartFile attachment, AttachmentUploadVO vo) {
        // 后缀名
        String suffix = FileUtil.getSuffix(attachment.getOriginalFilename());
        // 名称
        String fileName = StrUtil.uuid() + "-" + System.currentTimeMillis() + "." + suffix;
        // 文件存储路径
        String filePath = buildFilePath(fileName);
        // 压缩后的文件名
        String compressedFileName = null;
        // 压缩后的文件的存储路径
        String compressedFilePath = null;
        // 是否做了压缩操作
        boolean isCompress = false;
        Attachment att = new Attachment();
        String host = settingService.getSettingValue(SettingConstants.HOST);
        try {
            // 存储文件
            FileUtil.writeBytes(attachment.getBytes(),filePath);
            // 图片压缩
            List<String> imgsType = new ArrayList<>(Arrays.asList("image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"));
            if(imgsType.contains(Objects.requireNonNull(attachment.getContentType()).toLowerCase())) {
                // 最大图片宽度
                int maxWidth = 1500;
                int maxHeight = 1500;
                Thumbnails.Builder<File> fileBuilder = Thumbnails.of(filePath).scale(1.0).outputQuality(1.0);
                BufferedImage src = fileBuilder.asBufferedImage();
                if(vo.isNeedCompress() && (src.getHeight(null) > maxHeight || src.getWidth(null) > maxWidth)){
                    compressedFileName = StrUtil.uuid() + "-" + System.currentTimeMillis() + "." + suffix;
                    compressedFilePath = buildFilePath(compressedFileName);
                    // 压缩
                    Thumbnails.Builder<File> builder = Thumbnails.of(filePath);
                    builder.size(maxWidth,maxHeight);
                    builder.toFile(compressedFilePath);
                    isCompress = true;
                }
                att.setTypeCode(0);
            } else {
                att.setTypeCode(1);
            }
            if (isCompress) {
                att.setSize(FileUtil.size(FileUtil.file(compressedFilePath)));
                att.setName(compressedFileName);
                att.setLink(host + "/static/" + compressedFilePath.replace(uploadPath,""));
            } else {
                att.setSize(FileUtil.size(FileUtil.file(filePath)));
                att.setName(fileName);
                att.setLink(host + "/static/" + filePath.replace(uploadPath,""));
            }
            att.setType(attachment.getContentType());
            att.setOriginName(attachment.getOriginalFilename());
            if (vo.isNeedRecord()) {
                this.save(att);
            }
            return att.getLink();
        } catch (IOException e) {
            throw new BizException(CodeEnum.ERROR);
        } finally {
            // 删除旧文件
            if(isCompress){
                FileUtil.del(filePath);
            }
        }
    }

    private String buildFilePath(String fileName) {
        return uploadPath + LocalDateTimeUtil.format(LocalDate.now(), DatePattern.NORM_DATE_PATTERN) + "/"  + fileName;
    }

    @Override
    public PageResult pageAttachment(AttachmentSearchVO vo) {
        Page<Attachment> page = (Page<Attachment>) PageUtil.getPage();
        LambdaQueryWrapper<Attachment> condition = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotNull(vo)) {
            if (StrUtil.isNotBlank(vo.getRemarks())) {
                condition.like(Attachment::getRemarks,vo.getRemarks());
            }
            if (vo.getType() != null) {
                if (vo.getType() == 0) {// 只查询图片
                    condition.eq(Attachment::getTypeCode,0);
                } else {
                    condition.ne(Attachment::getTypeCode,0);
                }
            }
        }
        condition.orderByDesc(Attachment::getCreateTime);
        this.page(page,condition);
        return PageResult.buildPageResult(page);
    }

    @Override
    public void updateAttachment(Attachment attachment) {
        if (StrUtil.isBlank(attachment.getId())) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }

        this.lambdaUpdate()
                .set(Attachment::getRemarks, attachment.getRemarks())
                .eq(Attachment::getId,attachment.getId())
                .update();
    }

}
