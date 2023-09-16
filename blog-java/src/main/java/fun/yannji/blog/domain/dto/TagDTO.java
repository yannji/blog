package fun.yannji.blog.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/24 19:53
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TagDTO {
    /**
     * 标签ID
     */
    private String id;
    /**
     * 标签名
     */
    private String name;
    /**
     * 展示顺序
     */
    private Integer sort;
    /**
     * 是否在前台展示
     */
    private Integer isDisplay;
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    /**
     * 拥有帖子的数量
     */
    private Long postCount;
}
