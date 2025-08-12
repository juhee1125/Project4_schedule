package com.project.schedule.controller;

import com.project.schedule.entity.UserEntity;
import com.project.schedule.service.CategoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    
    //일정등록
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {
    	System.out.println(body.get("cCategory") + body.get("cColor"));
    	categoryService.register(body.get("cCategory"), body.get("cColor"));
    	
        return "일정등록 성공";
    }
}