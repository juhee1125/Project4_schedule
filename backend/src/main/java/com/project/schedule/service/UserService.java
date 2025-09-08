// service/UserService.java
package com.project.schedule.service;

import com.project.schedule.entity.UserEntity;
import com.project.schedule.jwt.JwtUtil;
import com.project.schedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    //회원가입
    public void signup(String mName, String mId, String mPw, String mPhone, String mEmail) {
        //중복아이디 확인
    	if (userRepository.findByMId(mId).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        
    	UserEntity user = UserEntity.builder()
                .MName(mName)
                .MId(mId)
                .MPw(passwordEncoder.encode(mPw))
                .MPhone(mPhone)
                .MEmail(mEmail)
                .build();

        userRepository.save(user);
    }
    
    //로그인
    public ResponseEntity<String> login(String mId, String mPw) {
    	if (mId == null || mId.isEmpty()) {
            throw new IllegalArgumentException("아이디를 입력해주세요");
        }

        if (mPw == null || mPw.isEmpty()) {
            throw new IllegalArgumentException("비밀번호를 입력해주세요");
        }
        
    	UserEntity user = userRepository.findByMId(mId)
    		    .orElseThrow(() -> new IllegalArgumentException("아이디가 일치하지 않습니다"));

	    if (!passwordEncoder.matches(mPw, user.getMPw())) {
	        throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
	    }    

        //JWT토큰 발급
	    String token = jwtUtil.createToken(user.getMId());
	    return ResponseEntity.ok(token);
    }
    
    //비밀번호변경
    public void changePw(String mId, String newmPw) {
    	Optional<UserEntity> user = userRepository.findByMId(mId);

        if (user.isEmpty()) {
        	throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        UserEntity newuser = user.get();
        newuser.setMPw(passwordEncoder.encode(newmPw));
        userRepository.save(newuser);
    }
}