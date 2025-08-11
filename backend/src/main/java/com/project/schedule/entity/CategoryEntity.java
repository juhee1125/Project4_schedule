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
    private Long cNum;
    
    @Column(name = "c_category")
    private String cCategory;
    @Column(name = "c_color")
    private String cColor;
}