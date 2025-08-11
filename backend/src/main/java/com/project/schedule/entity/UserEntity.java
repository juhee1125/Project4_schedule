package com.project.schedule.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    //JPA에서는 객체 필드를 캡슐화(private) 하고, 접근은 getter/setter를 통해 이루어지는 방식이 표준 설계
    //JPA가 내부적으로 리플렉션(Reflection) 으로 필드 접근을 제어하기 때문에,**접근 제어자(private)**가 더 안정적이고 호환성 높음
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mNum;
    
    @Column(name = "m_name")
    private String MName;
    @Column(name = "m_id")
    private String MId;
    @Column(name = "m_pw")
    private String MPw;
    @Column(name = "m_phone")
    private String MPhone;
    @Column(name = "m_email")
    private String MEmail;
}