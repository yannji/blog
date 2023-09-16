package fun.yannji.blog.common.base;

import com.baomidou.mybatisplus.annotation.IEnum;

import java.io.Serializable;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/22 13:36
 */
public interface BaseEnum<T extends Serializable> extends IEnum<T> {

    @Override
    T getValue();

    String getDesc();
}
