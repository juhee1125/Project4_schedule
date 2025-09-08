// service/UserService.java
package com.project.schedule.service;

import com.project.schedule.entity.ConnectEntity;
import com.project.schedule.repository.ConnectRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ConnectService {

    private final ConnectRepository connectRepository;

    //일정등록
    public void register(Long sNum, Long cNum) {
    	ConnectEntity connect = ConnectEntity.builder()
                .SNum(sNum)
                .CNum(cNum)
                .build();
    	
        connectRepository.save(connect);
    }
}