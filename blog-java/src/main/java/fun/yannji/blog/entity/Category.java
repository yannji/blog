package fun.yannji.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import fun.yannji.blog.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 10:20
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@TableName("tb_category")
public class Category extends BaseEntity {
    /**
     * 分类名称
     */
    private String name;
    /**
     * 是否展示
     */
    private Integer isDisplay;
    /**
     * 标签排序
     */
    private Integer sort;
}

