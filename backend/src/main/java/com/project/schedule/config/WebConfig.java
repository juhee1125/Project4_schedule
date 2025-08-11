package com.project.schedule.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 API 허용
                .allowedOrigins("http://localhost:3000") // ✅ React 개발 서버 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용 메서드
                .allowedHeaders("*")
                .allowCredentials(true); // 쿠키 포함 허용
    }
}
