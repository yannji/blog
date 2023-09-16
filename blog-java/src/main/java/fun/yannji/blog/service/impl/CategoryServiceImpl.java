package fun.yannji.blog.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.dto.CategoryDTO;
import fun.yannji.blog.entity.Category;
import fun.yannji.blog.mapper.CategoryMapper;
import fun.yannji.blog.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 10:22
 */

@Service
public class CategoryServiceImpl
        extends ServiceImpl<CategoryMapper, Category>
        implements CategoryService {

    @Override
    public List<CategoryDTO> listCategory(boolean isAdmin) {
        return this.baseMapper.listCategory(isAdmin);
    }

    @Override
    public void saveCategory(Category category) {
        if (StrUtil.isBlank(category.getName())) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        category.setId(null);
        this.save(category);
    }

    @Override
    public void updateCategory(Category category) {
        if (
                StrUtil.isBlank(category.getName()) ||
                StrUtil.isBlank(category.getId())
        ) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        category.setCreateTime(null);
        category.setIsDeleted(0);
        this.updateById(category);
    }
}
