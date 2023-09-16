package fun.yannji.blog.controller;

import cn.dev33.satoken.stp.StpUtil;
import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.dto.UserFrontDTO;
import fun.yannji.blog.domain.vo.UserInfoUpdateVO;
import fun.yannji.blog.domain.vo.UserPasswordUpdateVO;
import fun.yannji.blog.entity.User;
import fun.yannji.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:52
 */

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/admin/user/login")
    public Response login(@RequestBody User user) {
        userService.login(user);
        return Response.ok();
    }

    @PostMapping("/admin/user/logout")
    public Response logout() {
        StpUtil.logout();
        return Response.ok();
    }

    @GetMapping("/admin/user/info")
    public Response getInfo() {
        User u = userService.getInfo();
        return Response.ok(u);
    }

    @GetMapping("/user/info")
    public Response getFrontInfo() {
        UserFrontDTO u = userService.getFrontUserInfo();
        return Response.ok(u);
    }

    @PutMapping("/admin/user/info")
    public Response updateInfo(@RequestBody UserInfoUpdateVO vo) {
        userService.updateInfo(vo);
        return Response.ok();
    }

    @PutMapping("/admin/user/password")
    public Response updatePassword(@RequestBody UserPasswordUpdateVO vo) {
        userService.updatePassword(vo);
        return Response.ok();
    }







}
