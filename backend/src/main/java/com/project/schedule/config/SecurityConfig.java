package com.project.schedule.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
    	.cors().and()
    	.csrf().disable()
        .authorizeHttpRequests(auth -> auth
        		//인증제외
        		.requestMatchers(
                    "/api/user/signup",
                    "/api/user/checkId",
                    "/api/user/login",
                    "/api/user/findID",
                    "/api/user/verifyID",
                    "/api/user/changePW"
                ).permitAll()
            	//그 외 인증요청
            .anyRequest().authenticated()
        );
    	
        return http.build();
    }
}
