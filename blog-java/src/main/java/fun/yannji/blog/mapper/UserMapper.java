package fun.yannji.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import fun.yannji.blog.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/3/23 14:51
 */

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
