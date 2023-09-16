package fun.yannji.blog.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.dto.UserFrontDTO;
import fun.yannji.blog.domain.vo.UserInfoUpdateVO;
import fun.yannji.blog.domain.vo.UserPasswordUpdateVO;
import fun.yannji.blog.entity.User;
import fun.yannji.blog.mapper.UserMapper;
import fun.yannji.blog.service.UserService;
import fun.yannji.blog.util.AuthUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:51
 */

@Service
public class UserServiceImpl
        extends ServiceImpl<UserMapper, User>
        implements UserService {

    @Override
    public void login(User user) {
        if (StrUtil.isBlank(user.getUsername()) || StrUtil.isBlank(user.getPassword())) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        LambdaQueryWrapper<User> condition = new LambdaQueryWrapper<>();
        condition.eq(User::getUsername,user.getUsername());
        User dbUser = this.getOne(condition);
        if (ObjectUtil.isNull(dbUser)) {
            throw new BizException(CodeEnum.USER_NOT_FOUND);
        }
        String salt = dbUser.getSalt();
        String dbPassword = dbUser.getPassword();

        if (AuthUtil.checkPassword(dbPassword,user.getPassword(),salt)) {
            StpUtil.login(dbUser.getId());
        } else {
            throw new BizException(CodeEnum.PASS_NOT_MATCHED);
        }
    }

    @Override
    public void updatePassword(UserPasswordUpdateVO vo) {
        String userId = AuthUtil.getUserId();
        User dbUser = this.getById(userId);
        if (ObjectUtil.isNull(dbUser)) {
            throw new BizException(CodeEnum.USER_NOT_FOUND);
        }
        String salt = dbUser.getSalt();
        String dbPassword = dbUser.getPassword();

        if (!AuthUtil.checkPassword(dbPassword,vo.getOldPassword(),salt)) {
            throw new BizException(CodeEnum.PASS_NOT_MATCHED);
        }
        String newSecretPassword = AuthUtil.hashRawPassword(vo.getNewPassword(), salt);
        this.lambdaUpdate()
                .set(User::getPassword,newSecretPassword)
                .set(User::getUpdateTime, LocalDateTime.now())
                .eq(User::getId,userId)
                .update();
    }

    @Override
    public User getInfo() {
        String userId = AuthUtil.getUserId();
        User user = this.getById(userId);
        user.setPassword(null);
        user.setSalt(null);
        return user;
    }

    @Override
    public void updateInfo(UserInfoUpdateVO vo) {
        if (StrUtil.isBlank(vo.getAvatar()) || StrUtil.isBlank(vo.getNickname())) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }
        User user = new User();
        user.setId("1");
        user.setAvatar(vo.getAvatar());
        user.setNickname(vo.getNickname());
        this.updateById(user);
    }

    @Override
    public UserFrontDTO getFrontUserInfo() {
        User user = this.getById("1");
        if (ObjectUtil.isNull(user)) {
            return null;
        }
        UserFrontDTO res = UserFrontDTO.builder()
                .nickname(user.getNickname())
                .avatar(user.getAvatar())
                .build();
        return res;
    }

}
