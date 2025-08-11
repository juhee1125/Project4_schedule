package com.project.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}
