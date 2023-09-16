package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/3 18:06
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostSearchVO {
    /**
     * 标题
     */
    private String title;
    /**
     * 是否置顶
     */
    private Integer isTop;
    /**
     * 是否前台展示
     */
    private Integer isDisplay;
    /**
     * 是否发布
     */
    private Integer isPublish;
}
