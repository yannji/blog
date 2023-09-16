package fun.yannji.blog.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 10:23
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryDTO {
    /**
     * 分类ID
     */
    private String id;
    /**
     * 分类名称
     */
    private String name;
    /**
     * 展示顺序
     */
    private Integer sort;
    /**
     * 是否在前台显示
     */
    private Integer isDisplay;
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    /**
     * 帖子数量
     */
    private Long postCount;
}
