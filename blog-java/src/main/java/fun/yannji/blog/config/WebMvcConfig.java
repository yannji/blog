package fun.yannji.blog.config;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.stp.StpUtil;
import fun.yannji.blog.common.exception.BizException;
import fun.yannji.blog.interceptor.PageableHandlerInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

/**
 * @author yuandi
 * @email adashhawk@163.com
 * @createtime 2023/3/6 16:49
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${project.upload}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .addResourceLocations("file:" + uploadPath)
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic());
    }

    /**
     * 分页拦截器
     * @return
     */
    @Bean
    PageableHandlerInterceptor pageableHandlerInterceptor() {
        return new PageableHandlerInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 添加分类拦截器
        registry.addInterceptor(pageableHandlerInterceptor()).addPathPatterns("/**");
        // 添加接口认证拦截器
        registry.addInterceptor(new SaInterceptor(handle -> {
            try {
                StpUtil.checkLogin();
            } catch (Exception e) {
                throw new BizException(500,"token无效");
            }
        })).addPathPatterns("/admin/**")
           .excludePathPatterns("/admin/user/login")
           .excludePathPatterns("/admin/setting/init");
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }


}
