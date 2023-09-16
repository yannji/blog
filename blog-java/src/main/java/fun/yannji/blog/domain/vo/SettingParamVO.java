package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/10 14:35
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SettingParamVO {

    private String key;

    private String value;

}
