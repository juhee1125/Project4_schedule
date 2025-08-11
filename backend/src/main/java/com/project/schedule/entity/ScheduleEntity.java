package com.project.schedule.entity;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sNum;
    
    @Column(name = "m_num")
    private Long MNum;
    @Column(name = "s_title")
    private String sTitle;
    @Column(name = "s_date")
    private Date sDate;
}