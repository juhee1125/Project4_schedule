package com.project.schedule.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	//cnum 찾기
	Optional<CategoryEntity> findByCCategoryAndCColor(String cCategory, String cColor);
	//cnum으로 해당내용 찾기
	List<CategoryEntity> findByCNum(Long cnum);
}