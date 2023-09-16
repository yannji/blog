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
public class PostCategoryDTO {
    /**
     * 帖子ID
     */
    @JsonIgnore
    private String postId;
    /**
     * 分类ID
     */
    private String categoryId;
    /**
     * 分类名称
     */
    private String categoryName;
    /**
     * 分类是否展示
     */
    private Integer isDisplay;
}

