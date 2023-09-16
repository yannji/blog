package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.domain.dto.TagDTO;
import fun.yannji.blog.entity.Tag;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:44
 */
public interface TagService extends IService<Tag> {


    List<TagDTO> listTag(boolean isAdmin);

    void saveTag(Tag tag);

    void updateTag(Tag tag);

}
