package fun.yannji.blog.interceptor;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.yannji.blog.util.PageUtil;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

/**
 * 分页拦截器
 */
public class PageableHandlerInterceptor implements HandlerInterceptor {

    private final String CURRENT = "current";
    private final String DEFAULT_CURRENT = "1";
    private final String SIZE = "size";
    private final String DEFAULT_SIZE = "20";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String currentPage = Optional.ofNullable( request.getParameter(CURRENT)).orElse(DEFAULT_CURRENT);
        String pageSize = Optional.ofNullable(request.getParameter(SIZE)).orElse(DEFAULT_SIZE);
        long current = Long.parseLong(currentPage);
        long size = Long.parseLong(pageSize);
        // 参数合理化
        if (current < 1L) {
            current = 1L;
        }
        if (size > 20L || size < 1L) {
            size = 20L;
        }
        PageUtil.setCurrentPage(new Page<>(current,size));
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        PageUtil.remove();
    }

}