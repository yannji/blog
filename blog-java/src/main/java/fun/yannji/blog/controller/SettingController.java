package fun.yannji.blog.controller;

import fun.yannji.blog.common.Response;
import fun.yannji.blog.domain.vo.SettingInitVO;
import fun.yannji.blog.domain.vo.SettingParamVO;
import fun.yannji.blog.entity.Setting;
import fun.yannji.blog.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yannji
 * @email yannji@163.com
 * @createtime 2023/4/4 19:37
 */

@RestController
public class SettingController {

    @Autowired
    private SettingService settingService;

    @GetMapping("/setting/list")
    @Cacheable(cacheNames = "settings",key = "'all'")
    public Response listSetting() {
        List<Setting> settings = settingService.list();
        Map<String, String> map = new HashMap<>();
        settings.forEach(item ->  map.put(item.getName(), item.getValue()));
        return Response.ok(map);
    }

    @PostMapping("/admin/setting/init")
    @CacheEvict(cacheNames = "settings",key = "'all'")
    public Response settingInit(@RequestBody SettingInitVO vo) {
        settingService.settingInit(vo);
        return Response.ok();
    }

    @PutMapping("/admin/setting")
    @CacheEvict(cacheNames = "settings",key = "'all'")
    public Response saveOrUpdateSetting(@RequestBody List<SettingParamVO> vo) {
        settingService.saveOrUpdateSetting(vo);
        return Response.ok();
    }




}
