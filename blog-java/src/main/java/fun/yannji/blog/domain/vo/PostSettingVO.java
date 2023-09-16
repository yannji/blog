package fun.yannji.blog.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/2 13:44
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostSettingVO {
    /**
     * 博客ID
     */
    private String id;
    /**
     * 标题
     */
    private String title;
    /**
     * 封面图片
     */
    private String coverImg;
    /**
     * 新增的标签
     */
    private List<String> addTagIds;
    /**
     * 移除的标签
     */
    private List<String> delTagIds;
    /**
     * 新增的分类
     */
    private List<String> addCategoryIds;
    /**
     * 移除的分类
     */
    private List<String> delCategoryIds;
    /**
     * 是否发布
     */
    private Integer isPublish;
    /**
     * 发布时间
     */
    private LocalDateTime publishTime;
    /**
     * 是否展示
     */
    private Integer isDisplay;
    /**
     * 是否置顶
     */
    private Integer isTop;
}
