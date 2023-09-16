package fun.yannji.blog.common.exception;

import fun.yannji.blog.common.enums.CodeEnum;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:59
 */

public class BizException extends RuntimeException{
    /**
     * 错误码
     */
    private Integer code;

    /**
     * 错误提示
     */
    private String message;


    public BizException() {
        super();
    }

    public BizException(String message) {
        super(message);
        this.message = message;
    }

    public BizException(Integer code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    public BizException(CodeEnum bizCodeEnum) {
        super(bizCodeEnum.getMsg());
        this.code = bizCodeEnum.getCode();
        this.message = bizCodeEnum.getMsg();
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
