package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/6 16:15
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttachmentUploadVO {

    /**
     * 图片是否需要被压缩存储
     */
    private boolean needCompress;
    /**
     * 是否需要被记录在附件中
     */
    private boolean needRecord;

}
