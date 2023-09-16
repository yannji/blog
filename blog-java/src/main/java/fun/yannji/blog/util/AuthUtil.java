package fun.yannji.blog.util;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.DigestUtil;
import fun.yannji.blog.common.exception.BizException;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/30 14:41
 */
public class AuthUtil {

    private static final String SECRET = "abcdefghijk";

    public static String getUserId() {
        Object loginId = null;
        try {
            loginId = StpUtil.getLoginId();
        } catch (NotLoginException e) {
            String message = e.getMessage();
            throw new BizException(500, message);
        }
        return (String) loginId;
    }

    public static Boolean checkPassword(String secretPassword,String rawPassword, String salt) {
        if (StrUtil.isBlank(secretPassword) || StrUtil.isBlank(rawPassword)) {
            return false;
        }
        String hash = DigestUtil.md5Hex(salt + SECRET + rawPassword + salt);
        if (secretPassword.equals(hash)) {
            return true;
        } else {
            return false;
        }
    }

    public static String hashRawPassword(String rawPassword, String salt) {
        return DigestUtil.md5Hex(salt + SECRET + rawPassword + salt);
    }


}
