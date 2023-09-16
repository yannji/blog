package fun.yannji.blog.common;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.yannji.blog.util.PageUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:40
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PageResult {

    private Long current;
    private Long size;
    private Long total;
    private List<?> list;

    public static PageResult buildPageResult(Page page) {
        PageResult pageResult = new PageResult(page.getCurrent(), page.getSize(),page.getTotal(), page.getRecords());
        return pageResult;
    }

    public static PageResult buildPageResult(Page<?> page,List<?> data) {
        return new PageResult(page.getCurrent(),page.getSize(),page.getTotal(),data);
    }

    public static PageResult buildPageResult() {
        return new PageResult(PageUtil.getCurrent(), PageUtil.getSize(),0L, Collections.EMPTY_LIST);
    }

}
