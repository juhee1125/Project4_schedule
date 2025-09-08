package com.project.schedule.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_num")
    private Long CNum;
    
    @Column(name = "c_category")
    private String CCategory;
    @Column(name = "c_color")
    private String CColor;
}