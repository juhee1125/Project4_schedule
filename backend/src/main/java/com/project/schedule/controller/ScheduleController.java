package com.project.schedule.controller;

import com.project.schedule.entity.UserEntity;
import com.project.schedule.service.ScheduleService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    
    //일정등록
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body, @AuthenticationPrincipal UserEntity user) {
    	Long MNum = user.getMNum();

    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    	try {
    	    java.util.Date utilDate = format.parse(body.get("sDate"));
    	    java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
    	        
        	scheduleService.register(MNum, body.get("sTitle"), sqlDate);
    	} catch (ParseException e) {
    	    e.printStackTrace();
    	}
    	
        return "일정등록 성공";
    }
}