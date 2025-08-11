package com.project.schedule.service;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
	
	private final CategoryRepository categoryRepository;

    //일정등록
    public void register(String cCategory, String cColor) {
    	CategoryEntity category = CategoryEntity.builder()
                .cCategory(cCategory)
                .cColor(cColor)
                .build();

    	categoryRepository.save(category);
    }
}