package fun.yannji.blog.domain.dto;

import fun.yannji.blog.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/27 18:25
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostDTO {
    /**
     * 帖子信息
     */
    private Post post;
    /**
     * 标签信息
     */
    private List<PostTagDTO> tags;
    /**
     * 分类信息
     */
    private List<PostCategoryDTO> categorys;
}
