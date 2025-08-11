package com.project.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.ScheduleEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

}
