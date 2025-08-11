package com.project.schedule.service;

import com.project.schedule.entity.ScheduleEntity;
import com.project.schedule.entity.UserEntity;
import com.project.schedule.jwt.JwtUtil;
import com.project.schedule.repository.ScheduleRepository;
import com.project.schedule.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.sql.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {
	
	private final ScheduleRepository scheduleRepository;
	private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    //일정등록
    public void register(Long MNum, String sTitle, Date sDate) {
    	ScheduleEntity schedule = ScheduleEntity.builder()
                .MNum(MNum)
                .sTitle(sTitle)
                .sDate(sDate)
                .build();

    	scheduleRepository.save(schedule);
    }
    
    //토큰추출
    public Long gettoken(@RequestHeader("Authorization") String authHeader) {
    	String token = authHeader.replace("Bearer ", "");
    	String userId = jwtUtil.getUsernameFromToken(token);
    	UserEntity user = userRepository.findByMId(userId)
    	        .orElseThrow(() -> new RuntimeException("회원 정보 없음"));
    	
    	return user.getMNum();
    }
}