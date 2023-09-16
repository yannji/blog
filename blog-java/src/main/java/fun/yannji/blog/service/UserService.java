package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.domain.dto.UserFrontDTO;
import fun.yannji.blog.domain.vo.UserInfoUpdateVO;
import fun.yannji.blog.domain.vo.UserPasswordUpdateVO;
import fun.yannji.blog.entity.User;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:51
 */
public interface UserService extends IService<User> {

    void login(User user);

    void updatePassword(UserPasswordUpdateVO vo);

    User getInfo();

    void updateInfo(UserInfoUpdateVO vo);

    UserFrontDTO getFrontUserInfo();

}
