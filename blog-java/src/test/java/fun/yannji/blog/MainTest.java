package fun.yannji.blog;

import cn.hutool.core.util.RandomUtil;
import fun.yannji.blog.util.RedisUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/22 13:45
 */

@SpringBootTest
public class MainTest {

    @Autowired
    private RedisUtil redisUtil;

    @Test
    public void test() {

    }

    public static void main(String[] args) {
        System.out.println(RandomUtil.randomString(20));
    }
}
