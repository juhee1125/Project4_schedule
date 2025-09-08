package com.project.schedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.ConnectEntity;

public interface ConnectRepository extends JpaRepository<ConnectEntity, Long> {
	//카테고리 등록
	List<ConnectEntity> findBySNum(Long sNum);
}
