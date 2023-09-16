package fun.yannji.blog.common.enums;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/22 13:52
 */
public enum CodeEnum {

    OK(200,"ok"),
    NOT_FOUND(404,"资源未找到"),
    ERROR(500,"error"),





    PARAMETER_ERROR(10001,"参数错误"),
    USER_NOT_FOUND(10002,"用户不存在"),
    PASS_NOT_MATCHED(10003,"用户名密码不匹配")
    ;

    private final Integer code;
    private final String msg;

    CodeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
