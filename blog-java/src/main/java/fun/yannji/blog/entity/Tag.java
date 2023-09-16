package fun.yannji.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import fun.yannji.blog.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:42
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@TableName("tb_tag")
public class Tag extends BaseEntity {
    /**
     * 标签名称
     */
    private String name;
    /**
     * 是否展示
     */
    private Integer isDisplay;
    /**
     * 展示顺序
     */
    private Integer sort;
}
