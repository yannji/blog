package fun.yannji.blog.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.dto.TagDTO;
import fun.yannji.blog.entity.Tag;
import fun.yannji.blog.mapper.TagMapper;
import fun.yannji.blog.service.TagService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:45
 */

@Service
public class TagServiceImpl
        extends ServiceImpl<TagMapper, Tag>
        implements TagService {

    @Override
    public List<TagDTO> listTag(boolean isAdmin) {
        return this.baseMapper.listTag(isAdmin);
    }

    @Override
    public void saveTag(Tag tag) {
        if (StrUtil.isBlank(tag.getName())) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        tag.setId(null);
        this.save(tag);
    }

    @Override
    public void updateTag(Tag tag) {
        if (
                StrUtil.isBlank(tag.getName()) ||
                StrUtil.isBlank(tag.getId())
        ) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        tag.setCreateTime(null);
        tag.setIsDeleted(0);
        this.updateById(tag);
    }


}
