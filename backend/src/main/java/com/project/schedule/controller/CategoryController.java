package com.project.schedule.controller;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.repository.CategoryRepository;
import com.project.schedule.service.CategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    
    //일정등록
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {
//    	String cCategory = body.get("cCategory");
//    	String cColor = body.get("cColor");
//    	categoryService.register(cCategory, cColor);
//    	
//    	Optional<CategoryEntity> category = categoryRepository.findByCCategoryAndCColor(cCategory, cColor);
//    	Long cnum = category.get().getCNum();
    	
        return "일정등록 성공";
    }
}