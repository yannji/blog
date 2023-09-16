package fun.yannji.blog.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:05
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Response implements Serializable {

    private Integer code;
    private String msg;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public static Response codeEnum(CodeEnum codeEnum, Object data) {
        return new Response(codeEnum.getCode(),codeEnum.getMsg(),data);
    }
    public static Response codeEnum(CodeEnum codeEnum) {
        return codeEnum(codeEnum,null);
    }

    public static Response ok(Object data) {
        return codeEnum(CodeEnum.OK,data);
    }
    public static Response ok() {
       return ok(null);
    }

    public static Response error(CodeEnum codeEnum) {
        return codeEnum(codeEnum);
    }
    public static Response error(BizException e) {
        return new Response(e.getCode(),e.getMessage(),null);
    }
    public static Response error() {
        return codeEnum(CodeEnum.ERROR);
    }
    public static Response error(Integer code, String msg) {
        return new Response(code,msg,null);
    }

}
