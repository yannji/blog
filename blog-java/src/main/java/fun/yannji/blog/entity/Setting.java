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
 * @createtime 2023/4/4 19:36
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@TableName("tb_setting")
public class Setting extends BaseEntity {

    /**
     * 配置键名
     */
    private String name;
    /**
     * 配置键值
     */
    private String value;

}
