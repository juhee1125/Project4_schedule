package com.project.schedule.service;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.entity.ScheduleEntity;
import com.project.schedule.repository.ScheduleRepository;

import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional	
@RequiredArgsConstructor
public class ScheduleService {
	
	private final ScheduleRepository scheduleRepository;

    //일정등록
    public Long register(Long MNum, String sTitle, Date sStartdate, Date sEnddate, String sStarttime, String sEndtime) {
    	ScheduleEntity schedule = ScheduleEntity.builder()
                .MNum(MNum)
                .STitle(sTitle)
                .SStartdate(sStartdate)
                .SEnddate(sEnddate)
                .SStarttime(sStarttime)
                .SEndtime(sEndtime)
                .build();

    	ScheduleEntity saved = scheduleRepository.save(schedule);
    	
    	return saved.getSNum();
    }
    
    //일정수정
    @Transactional
    public void update(Long sNum, String sTitle, Date sStartdate, Date sEnddate, String sStarttime, String sEndtime) {
    	System.out.println(scheduleRepository.findBySNum(sNum));
    	ScheduleEntity schedule = scheduleRepository.findBySNum(sNum)
    	        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정 ID: " + sNum));

    	schedule.setSTitle(sTitle);
    	schedule.setSStartdate(sStartdate);
    	schedule.setSEnddate(sEnddate);
    	schedule.setSStarttime(sStarttime);
    	schedule.setSEndtime(sEndtime);
    }
}