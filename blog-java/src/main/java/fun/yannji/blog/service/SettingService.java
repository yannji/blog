package fun.yannji.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import fun.yannji.blog.domain.vo.SettingInitVO;
import fun.yannji.blog.domain.vo.SettingParamVO;
import fun.yannji.blog.entity.Setting;

import java.util.List;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/4 19:38
 */
public interface SettingService extends IService<Setting> {

    void settingInit(SettingInitVO vo);

    String getSettingValue(String key);

    void saveOrUpdateSetting(List<SettingParamVO> vo);
}
