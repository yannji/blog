package fun.yannji.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import fun.yannji.blog.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:03
 */

@Mapper
public interface PostMapper extends BaseMapper<Post> {

    void saveTagsToPost(@Param("tags") List<String> tags, @Param("postId") String postId);

    void saveCategorysToPost(@Param("categorys") List<String> categorys, @Param("postId") String postId);

    void removeTagsFromPost(@Param("tags") List<String> tags, @Param("postId") String postId);

    void removeCategorysFromPost(@Param("categorys") List<String> categorys, @Param("postId") String postId);

    Long selectCountByTagId(@Param("tagId") String tagId, @Param("isAdmin") boolean isAdmin);

    List<Post> pagePostByTagId(@Param("tagId") String tagId, @Param("isAdmin") boolean isAdmin, @Param("current") Long limitCurrent, @Param("size") long size);

    Long selectCountByCategoryId(@Param("categoryId") String categoryId, @Param("isAdmin") boolean isAdmin);

    List<Post> pagePostByCategoryId(@Param("categoryId") String categoryId, @Param("isAdmin") boolean isAdmin, @Param("current") Long limitCurrent, @Param("size") long size);
}
