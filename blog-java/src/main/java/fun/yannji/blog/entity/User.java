package fun.yannji.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import fun.yannji.blog.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:48
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@TableName("tb_user")
public class User extends BaseEntity {
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 昵称
     */
    private String nickname;
    /**
     * 加密随机盐
     */
    private String salt;
    /**
     * 头像
     */
    private String avatar;
}
