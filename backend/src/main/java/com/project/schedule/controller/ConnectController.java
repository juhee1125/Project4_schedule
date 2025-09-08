package com.project.schedule.controller;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.entity.ScheduleEntity;
import com.project.schedule.entity.UserEntity;
import com.project.schedule.repository.ScheduleRepository;
import com.project.schedule.service.CategoryService;
import com.project.schedule.service.ConnectService;
import com.project.schedule.service.ScheduleService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ConnectController {
	
    private final ConnectService connectService;
    
    private final CategoryService categoryService;
    private final ScheduleService scheduleService;
    
    //일정등록
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body, @AuthenticationPrincipal UserEntity user) {
    	//category_entity 등록
    	String cCategory = body.get("cCategory");
    	String cColor = body.get("cColor");
    	Long cnum = categoryService.select(cCategory, cColor);
    	if ( cnum == null) {
    		CategoryEntity category = categoryService.register(cCategory, cColor);
    		
    		cnum = category.getCNum();
    	}
    	
    	//schedule_entity 등록
    	Long MNum = user.getMNum();
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    	Long snum = null;
    	try {
    	    java.util.Date utilStartDate = format.parse(body.get("sStartdate"));
    	    java.sql.Date sqlStartDate = new java.sql.Date(utilStartDate.getTime());
    	    java.util.Date utilEndDate = format.parse(body.get("sEnddate"));
    	    java.sql.Date sqlEndDate = new java.sql.Date(utilEndDate.getTime());
    	        
        	snum = scheduleService.register(MNum, body.get("sTitle"), sqlStartDate, sqlEndDate, body.get("sStarttime"), body.get("sEndtime"));
    	} catch (ParseException e) {
    	    e.printStackTrace();
    	}
    	
    	//connect_entity 등록
    	connectService.register(snum, cnum);
    	
        return "등록 성공";
    }
    
  //일정수정
    @PostMapping("/modify")
    public String modify(@RequestBody Map<String, String> body) {
    	System.out.println("sSnum "+body.get("sSnum")+" sStartdate "+body.get("sStartdate")+" sEnddate "+body.get("sEnddate")+" sTitle "+body.get("sTitle")+" sStarttime "+body.get("sStarttime")+" sEndtime "+body.get("sEndtime")+" cCategory "+body.get("cCategory")+" cColor "+body.get("cColor"));
    	//category_entity cnum 추출
    	String cCategory = body.get("cCategory");
    	String cColor = body.get("cColor");
    	Long cnum = categoryService.select(cCategory, cColor);
    	
    	if (cnum == null) {
    		CategoryEntity category = categoryService.register(cCategory, cColor);
    		
    		cnum = category.getCNum();
    	}
    	
    	//schedule_entity 수정
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    	
    	Long snum = Long.parseLong(body.get("sSnum"));
    	try {
    	    java.util.Date utilStartDate = format.parse(body.get("sStartdate"));
    	    java.sql.Date sqlStartDate = new java.sql.Date(utilStartDate.getTime());
    	    java.util.Date utilEndDate = format.parse(body.get("sEnddate"));
    	    java.sql.Date sqlEndDate = new java.sql.Date(utilEndDate.getTime());
    	        
        	scheduleService.update(snum, body.get("sTitle"), sqlStartDate, sqlEndDate, body.get("sStarttime"), body.get("sEndtime"));
    	} catch (ParseException e) {
    	    e.printStackTrace();
    	}
    	
    	//connect_entity 수정
    	connectService.register(snum, cnum);
    	
        return "수정 성공";
    }
}