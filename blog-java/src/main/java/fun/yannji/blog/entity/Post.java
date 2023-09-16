package fun.yannji.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import fun.yannji.blog.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:00
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@TableName("tb_post")
public class Post extends BaseEntity {

    /**
     * 标题
     */
    private String title;
    /**
     * 封面图片
     */
    private String coverImg;
    /**
     * markdown内容
     */
    private String mdContent;
    /**
     * 是否发布
     */
    private Integer isPublish;
    /**
     * 发布时间
     */
    private LocalDateTime publishTime;
    /**
     * 浏览量
     */
    private Integer views;
    /**
     * 点赞量
     */
    private Integer thumbs;
    /**
     * 是否展示
     */
    private Integer isDisplay;
    /**
     * 是否置顶
     */
    private Integer isTop;

}
