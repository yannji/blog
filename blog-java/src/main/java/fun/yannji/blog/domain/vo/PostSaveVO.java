package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/25 10:38
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostSaveVO {
    /**
     * 博客ID
     */
    private String id;
    /**
     * 博客标题
     */
    private String title;
    /**
     * 博客内容
     */
    private String mdContent;
}
