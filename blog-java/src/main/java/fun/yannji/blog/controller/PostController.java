package fun.yannji.blog.controller;

import fun.yannji.blog.common.PageResult;
import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.dto.PostDTO;
import fun.yannji.blog.domain.vo.PostSaveVO;
import fun.yannji.blog.domain.vo.PostSearchVO;
import fun.yannji.blog.domain.vo.PostSettingVO;
import fun.yannji.blog.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/22 13:03
 */

@RestController
@Api(tags = "帖子模块")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/admin/post/list")
    public Response listAdminPost(PostSearchVO vo) {
        PageResult res = postService.listPost(vo,true);
        return Response.ok(res);
    }

    @GetMapping("/post/list")
    public Response listFrontPost() {
        PageResult res = postService.listPost(null,false);
        return Response.ok(res);
    }

    @GetMapping("/archive/post/list")
    public Response listFrontArchivePost() {
        PageResult res = postService.listArchivePost(false);
        return Response.ok(res);
    }

    @GetMapping("/admin/tag/{id}/post/list")
    public Response listAdminPostByTagId(@PathVariable String id) {
        PageResult res = postService.listPostByTagId(id, true);
        return Response.ok(res);
    }


    @GetMapping("/tag/{id}/post/list")
    public Response listFrontPostByTagId(@PathVariable String id) {
        PageResult res = postService.listPostByTagId(id, false);
        return Response.ok(res);
    }

    @PutMapping("/post/{id}/like")
    public Response likePost(@PathVariable String id) {
        // TODO
        return Response.ok();
    }

    @GetMapping("/admin/category/{id}/post/list")
    public Response listAdminPostByCategoryId(@PathVariable String id) {
        PageResult res = postService.listPostByCategoryId(id, true);
        return Response.ok(res);
    }

    @GetMapping("/category/{id}/post/list")
    public Response listFrontPostByCategoryId(@PathVariable String id) {
        PageResult res = postService.listPostByCategoryId(id, false);
        return Response.ok(res);
    }

    @GetMapping("/admin/post/info/{id}")
    @ApiOperation("获取帖子信息")
    public Response adminPostInfo(@PathVariable String id) {
        PostDTO dto = postService.getPostInfo(id,true);
        return Response.ok(dto);
    }

    @GetMapping("/post/info/{id}")
    @ApiOperation("获取帖子信息")
    public Response frontPostInfo(@PathVariable String id) {
        PostDTO dto = postService.getPostInfo(id,false);
        return Response.ok(dto);
    }

    @PostMapping("/admin/post/save")
    @ApiOperation("保存帖子")
    public Response save(@RequestBody PostSaveVO vo) {
        String id = postService.savePost(vo);
        return Response.ok(id);
    }

    @DeleteMapping("/admin/post/{id}")
    public Response delete(@PathVariable String id) {
        postService.removeById(id);
        return Response.ok();
    }

    @PutMapping("/admin/post/setting")
    @ApiOperation("设置帖子")
    public Response setting(@RequestBody PostSettingVO vo) {
        postService.settingPost(vo);
        return Response.ok();
    }

    @PostMapping("/admin/post/publish")
    @ApiOperation("发布帖子")
    public Response publish(@RequestBody PostSettingVO vo) {
        return Response.ok();
    }


}
