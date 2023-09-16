package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 16:37
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttachmentDeleteVO {
    /**
     * 需要删除的附件ID集合
     */
    private List<String> delIds;
}
