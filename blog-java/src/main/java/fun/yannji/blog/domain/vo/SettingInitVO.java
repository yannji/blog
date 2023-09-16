package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/6 14:54
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SettingInitVO {
    /**
     * 后端项目部署地址
     */
    private String host;
    /**
     * 管理员昵称
     */
    private String nickname;
    /**
     * 管理员用户名
     */
    private String username;
    /**
     * 管理员密码
     */
    private String password;
}
