package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.domain.vo.AttachmentSearchVO;
import fun.yannji.blog.domain.vo.AttachmentUploadVO;
import fun.yannji.blog.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 11:29
 */
public interface AttachmentService extends IService<Attachment> {

    /**
     * 上传附件
     * @param attachment
     * @return
     */
    String uploadAttachment(MultipartFile attachment, AttachmentUploadVO vo);

    /**
     * 分页查询附件
     * @return
     */
    PageResult pageAttachment(AttachmentSearchVO vo);

    /**
     * 修改附件信息
     * @param attachment
     */
    void updateAttachment(Attachment attachment);
}
