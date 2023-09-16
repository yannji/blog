package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/6 21:19
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserInfoUpdateVO {
    /**
     * 用户昵称
     */
    private String nickname;
    /**
     * 用户头像
     */
    private String avatar;
}
