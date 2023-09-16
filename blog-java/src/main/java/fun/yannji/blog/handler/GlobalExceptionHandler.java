package fun.yannji.blog.handler;

import fun.yannji.blog.common.Response;
import fun.yannji.blog.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * 处理自定义业务异常
     * @param ex
     * @return
     */
    @ExceptionHandler(BizException.class)
    public Response bizException(BizException ex) {
        log.error(ex.getMessage());
        return Response.error(ex);
    }

    /**
     * 处理所有异常
     */
    @ExceptionHandler(Exception.class)
    public Response exception(Exception e) {
        log.error(e.getMessage());
        return Response.error();
    }


}