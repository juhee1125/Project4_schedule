package com.project.schedule.service;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
	
	private final CategoryRepository categoryRepository;

    //일정등록
    public CategoryEntity register(String cCategory, String cColor) {
    	CategoryEntity category = CategoryEntity.builder()
                .CCategory(cCategory)
                .CColor(cColor)
                .build();

    	return categoryRepository.save(category);
    }
    
    //일정조회
    @Transactional
    public Long select(String newCategory, String newColor) {
    	Optional<CategoryEntity> category = categoryRepository.findByCCategoryAndCColor(newCategory, newColor);

        return category.get().getCNum();
    }
}