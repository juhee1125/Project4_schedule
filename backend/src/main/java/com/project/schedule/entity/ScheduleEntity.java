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
    @Column(name = "s_num")
    private Long SNum;
    
    @Column(name = "m_num")
    private Long MNum;
    @Column(name = "s_title")
    private String STitle;
    @Column(name = "s_startdate")
    private Date SStartdate;
    @Column(name = "s_enddate")
    private Date SEnddate;
    @Column(name = "s_starttime")
    private String SStarttime;
    @Column(name = "s_endtime")
    private String SEndtime;
    
}