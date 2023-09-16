package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.domain.dto.CategoryDTO;
import fun.yannji.blog.entity.Category;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 10:22
 */
public interface CategoryService extends IService<Category> {

    List<CategoryDTO> listCategory(boolean isAdmin);

    void saveCategory(Category category);

    void updateCategory(Category category);
}
