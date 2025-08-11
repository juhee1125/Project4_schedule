package com.project.schedule.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.schedule.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	//회원가입, 로그인
	Optional<UserEntity> findByMId(String mId);
	//아이디찾기
	Optional<UserEntity> findByMNameAndMPhone(String mName, String mPhone);
}
