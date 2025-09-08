package com.project.schedule.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.ScheduleEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
	//snum 찾기
	Optional<ScheduleEntity> findBySNum(Long sNum);
	//mnum 찾기
	List<ScheduleEntity> findByMNum(Long MNum);
}
