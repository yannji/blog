package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/4 15:17
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttachmentSearchVO {
    /**
     * 附件类型
     */
    private Integer type;
    /**
     * 附件备注
     */
    private String remarks;
}
