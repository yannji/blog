package fun.yannji.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import fun.yannji.blog.domain.dto.PostTagDTO;
import fun.yannji.blog.domain.dto.TagDTO;
import fun.yannji.blog.entity.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:44
 */

@Mapper
public interface TagMapper extends BaseMapper<Tag> {

    List<TagDTO> listTag(boolean isAdmin);

    List<PostTagDTO> listTagByPostIds(@Param("postIds") Set<String> postIds, @Param("isAdmin") boolean isAdmin);

}
