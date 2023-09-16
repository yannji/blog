package fun.yannji.blog.controller;

import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.dto.CategoryDTO;
import fun.yannji.blog.entity.Category;
import fun.yannji.blog.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/25 10:24
 */

@RestController
@Api(tags = "分类模块")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/post-category/list")
    @ApiOperation("前台获取分类")
    public Response listCategory() {
        List<CategoryDTO> res = categoryService.listCategory(false);
        return Response.ok(res);
    }

    @GetMapping("/admin/post-category/list")
    @ApiOperation("后台获取分类")
    public Response listAllCategory() {
        List<CategoryDTO> res = categoryService.listCategory(true);
        return Response.ok(res);
    }

    @PostMapping("/admin/post-category")
    @ApiOperation("创建分类")
    public Response saveCategory(@RequestBody Category category) {
        categoryService.saveCategory(category);
        return Response.ok();
    }

    @PutMapping("/admin/post-category")
    @ApiOperation("修改分类")
    public Response updateCategory(@RequestBody Category category) {
        categoryService.updateCategory(category);
        return Response.ok();
    }

    @DeleteMapping("/admin/post-category/{id}")
    @ApiOperation("删除分类")
    public Response removeCategory(@PathVariable String id) {
        categoryService.removeById(id);
        return Response.ok();
    }
}
