package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/30 14:40
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserPasswordUpdateVO {
    /**
     * 旧密码
     */
    private String oldPassword;
    /**
     * 新密码
     */
    private String newPassword;
}
