package com.project.schedule.controller;

import com.project.schedule.entity.UserEntity;
import com.project.schedule.repository.UserRepository;
import com.project.schedule.service.UserService;
import lombok.RequiredArgsConstructor;

import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
//final이나 @NonNull 붙은 필드만을 대상으로 생성자를 자동 생성
@RequiredArgsConstructor
public class UserController {

	private final UserRepository userRepository;
    private final UserService userService;
    
    //회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> body) {
        userService.signup(body.get("mName"), body.get("mId"), body.get("mPw"), body.get("mPhone"), body.get("mEmail"));
        return "회원가입 성공";
    }
    //중복아이디 확인
    @GetMapping("/checkId")
    public ResponseEntity<Map<String, Boolean>> checkId(@RequestParam String mId) {
    	boolean exists = userRepository.findByMId(mId).isPresent();
        Map<String, Boolean> result = new HashMap<>();
        result.put("exists", exists);

        return ResponseEntity.ok(result);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    	System.out.println("로그인페이지");
        try {
            ResponseEntity<String> token = userService.login(body.get("mId"), body.get("mPw"));
            System.out.println("로그인 토큰 "+token);
            return ResponseEntity.ok().body(Map.of("token", token));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
    
    //아이디찾기
    @PostMapping("/findID")
    public String findID(@RequestBody Map<String, String> body) {
    	String mName = body.get("mName");
    	String mPhone = body.get("mPhone");
    	Optional<UserEntity> user = userRepository.findByMNameAndMPhone(mName, mPhone);
    	
		if (user.isPresent()) {
		    String userId = user.get().getMId();
		    
		    return userId;
		} else {
			return "일치하는 아이디가 없습니다";
		}
    }
    //비밀번호찾기(아이디확인)
    @PostMapping("/verifyID")
    public ResponseEntity<Map<String, Boolean>> verifyID(@RequestBody Map<String, String> body) {
    	String mId = body.get("mId");
    	boolean exists = userRepository.findByMId(mId).isPresent();

    	if (exists) {
    		Map<String, Boolean> result = new HashMap<>();
            result.put("exists", exists);
            
            return ResponseEntity.ok(result);
    	} else {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", false));
    	}
    }
    //비밀번호찾기(비밀번호변경)
    @PostMapping("/changePW")
    public ResponseEntity<String> changePW(@RequestBody Map<String, String> body) {
        String mId = body.get("mId");
        String newmPw = body.get("newmPw");

        userService.changePw(mId, newmPw);
        
        return ResponseEntity.ok("비밀번호 변경 완료");
    }
}