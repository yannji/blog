package fun.yannji.blog.controller;

import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.dto.TagDTO;
import fun.yannji.blog.entity.Tag;
import fun.yannji.blog.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:44
 */

@RestController
@Api(tags = "标签模块")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/post-tag/list")
    @ApiOperation("前台获取标签")
    public Response listTag() {
        List<TagDTO> res = tagService.listTag(false);
        return Response.ok(res);
    }

    @GetMapping("/admin/post-tag/list")
    @ApiOperation("后台获取标签")
    public Response listAllTag() {
        List<TagDTO> res = tagService.listTag(true);
        return Response.ok(res);
    }

    @PostMapping("/admin/post-tag")
    @ApiOperation("创建标签")
    public Response saveTag(@RequestBody Tag tag) {
        tagService.saveTag(tag);
        return Response.ok();
    }

    @PutMapping("/admin/post-tag")
    @ApiOperation("修改标签")
    public Response updateTag(@RequestBody Tag tag) {
        tagService.updateTag(tag);
        return Response.ok();
    }

    @DeleteMapping("/admin/post-tag/{id}")
    @ApiOperation("删除标签")
    public Response removeTag(@PathVariable String id) {
        tagService.removeById(id);
        return Response.ok();
    }

}
