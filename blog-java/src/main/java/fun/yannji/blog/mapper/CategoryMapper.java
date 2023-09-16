package fun.yannji.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import fun.yannji.blog.domain.dto.CategoryDTO;
import fun.yannji.blog.domain.dto.PostCategoryDTO;
import fun.yannji.blog.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 10:21
 */

@Mapper
public interface CategoryMapper extends BaseMapper<Category> {

    List<CategoryDTO> listCategory(boolean isAdmin);

    List<PostCategoryDTO> listCategoryByPostIds(@Param("postIds") Set<String> postIds, @Param("isAdmin") boolean isAdmin);
}
