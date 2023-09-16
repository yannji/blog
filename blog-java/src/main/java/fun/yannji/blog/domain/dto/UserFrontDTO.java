package fun.yannji.blog.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/12 15:30
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserFrontDTO {
    private String nickname;
    private String avatar;
}
