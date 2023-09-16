package fun.yannji.blog.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/3 13:26
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostTagDTO {
    /**
     * 帖子ID
     */
    @JsonIgnore
    private String postId;
    /**
     * 标签ID
     */
    private String tagId;
    /**
     * 标签名
     */
    private String tagName;
    /**
     * 标签是否展示
     */
    private Integer isDisplay;
}
