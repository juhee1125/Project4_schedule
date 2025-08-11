package com.project.schedule.controller;

import com.project.schedule.service.ConnectService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ConnectController {

    private final ConnectService connectService;
    
    //일정등록
    @PostMapping("/connect")
    public String connect(@RequestBody Map<String, String> body) {
    	Long sNum = Long.parseLong(body.get("sNum"));
        Long cNum = Long.parseLong(body.get("cNum"));
        
    	connectService.connect(sNum, cNum);
        return "일정등록 성공";
    }
}