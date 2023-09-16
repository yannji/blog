package fun.yannji.blog.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import fun.yannji.blog.common.constants.CommonConstants;
import fun.yannji.blog.common.constants.SettingConstants;
import fun.yannji.blog.common.enums.CodeEnum;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.domain.vo.SettingInitVO;
import fun.yannji.blog.domain.vo.SettingParamVO;
import fun.yannji.blog.entity.Setting;
import fun.yannji.blog.entity.User;
import fun.yannji.blog.mapper.SettingMapper;
import fun.yannji.blog.service.SettingService;
import fun.yannji.blog.service.UserService;
import fun.yannji.blog.util.AuthUtil;
import fun.yannji.blog.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/4 19:38
 */

@Service
public class SettingServiceImpl
        extends ServiceImpl<SettingMapper, Setting>
        implements SettingService {

    @Autowired
    private UserService userService;
    @Autowired
    private RedisUtil redisUtil;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void settingInit(SettingInitVO vo) {
        String host = vo.getHost();
        String nickname = vo.getNickname();
        String username = vo.getUsername();
        String password = vo.getPassword();
        if (StrUtil.isBlank(host) || StrUtil.isBlank(nickname) || StrUtil.isBlank(username) || StrUtil.isBlank(password)) {
            throw new BizException(CodeEnum.PARAMETER_ERROR);
        }

        Setting hostSetting = Setting.builder().name(SettingConstants.HOST)
                .value(host).build();
        Setting initializedSetting = Setting.builder().name(SettingConstants.INITIALIZED)
                .value("true").build();

        this.saveBatch(Arrays.asList(
                hostSetting,
                initializedSetting
        ));

        User user = new User();
        user.setId("1");
        user.setUsername(username);
        user.setNickname(nickname);
        String salt = RandomUtil.randomString(40);
        user.setSalt(salt);
        user.setPassword(AuthUtil.hashRawPassword(password,salt));
        user.setAvatar(CommonConstants.USER_DEFAULT_AVATAR);
        userService.saveOrUpdate(user);

    }

    @Override
    public String getSettingValue(String key) {
        Object value = redisUtil.getCacheObject("setting::" + key);
        if (ObjectUtil.isNull(value)) {
            Setting setting = this.getOne(new LambdaQueryWrapper<Setting>()
                    .eq(Setting::getName, key)
            );
            if (ObjectUtil.isNull(setting) || StrUtil.isBlank(setting.getValue())) {
                throw new BizException();
            }
            redisUtil.setCacheObject("setting::" + key,setting.getValue());
            return setting.getValue();
        } else {
            return (String) value;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveOrUpdateSetting(List<SettingParamVO> vo) {

        // 获取系统内所有配置
        List<Setting> settings = this.list();

        List<Setting> settingToCreate = new ArrayList<>();
        List<Setting> settingToUpdate = new ArrayList<>();

        Map<String, Setting> settingMap = settings.stream()
                        .collect(Collectors.toMap(Setting::getName, setting -> setting));


        vo.forEach(param -> {
            String key = param.getKey();
            if (settingMap.containsKey(key)) {
                Setting setting = settingMap.get(key);
                setting.setValue(param.getValue());
                settingToUpdate.add(setting);
            } else {
                Setting setting = Setting.builder().name(param.getKey())
                        .value(param.getValue())
                        .build();
                settingToCreate.add(setting);
            }
        });

        this.updateBatchById(settingToUpdate);
        this.saveBatch(settingToCreate);

    }


}
