package fun.yannji.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import fun.yannji.blog.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/26 11:27
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@TableName("tb_attachment")
public class Attachment extends BaseEntity {
    /**
     * 文件名
     */
    private String name;
    /**
     * 原始文件名
     */
    private String originName;
    /**
     * 文件类型
     */
    private String type;
    /**
     * 类型标识
     */
    private Integer typeCode;
    /**
     * 文件大小
     */
    private Long size;
    /**
     * 访问链接
     */
    private String link;
    /**
     * 备注信息
     */
    private String remarks;
}
