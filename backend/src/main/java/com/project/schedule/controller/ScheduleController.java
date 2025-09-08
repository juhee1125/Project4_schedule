package com.project.schedule.controller;

import com.project.schedule.entity.CategoryEntity;
import com.project.schedule.entity.ConnectEntity;
import com.project.schedule.entity.ScheduleEntity;
import com.project.schedule.entity.UserEntity;
import com.project.schedule.repository.CategoryRepository;
import com.project.schedule.repository.ConnectRepository;
import com.project.schedule.repository.ScheduleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

	private final ScheduleRepository scheduleRepository;
	private final ConnectRepository connectRepository;
	private final CategoryRepository categoryRepository;
    
    //일정 불러옴
    @GetMapping("/userschedule")
    public List<Map<String, String>> userschedule(@AuthenticationPrincipal UserEntity user) {
    	//사용자 일정
    	Long MNum = user.getMNum();
    	
    	List<ScheduleEntity> loginuserlist = scheduleRepository.findByMNum(MNum);
    	List<Map<String, String>> list = new ArrayList<>();
    	
    	for (ScheduleEntity loginuser : loginuserlist) {
        	System.out.println(loginuser.getSStartdate().getClass());
    		Map<String, String> map = new HashMap<>();
    		map.put("snum", loginuser.getSNum().toString());
    		map.put("title", loginuser.getSTitle());
    		map.put("startdate", loginuser.getSStartdate().toString());
    		map.put("enddate", loginuser.getSEnddate().toString());
    		map.put("starttime", loginuser.getSStarttime().toString());
    		map.put("endtime", loginuser.getSEndtime().toString());
    		
    		
    		List<Long> list1 = new ArrayList<>();
    		List<ConnectEntity> connectlist = connectRepository.findBySNum(loginuser.getSNum());
    		for (ConnectEntity connect : connectlist) {
    			list1.add(connect.getCNum());
    		}
        	
        	for (Long cnum : list1) {
            	List<CategoryEntity> cnumlist = categoryRepository.findByCNum(cnum);
            	for (CategoryEntity category : cnumlist) {
            		map.put("category", category.getCCategory());
            		map.put("color", category.getCColor());
            	}
        	}
        	
    		list.add(map);
    	}
    	
        return list;
    }
}