package fun.yannji.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import fun.yannji.blog.entity.Setting;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/4 19:37
 */

@Mapper
public interface SettingMapper extends BaseMapper<Setting> {
}
