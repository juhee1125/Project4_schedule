package com.project.schedule.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConnectEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coNum;
    
    @Column(name = "s_num")
    private Long sNum;
    @Column(name = "c_num")
    private Long cNum;
}