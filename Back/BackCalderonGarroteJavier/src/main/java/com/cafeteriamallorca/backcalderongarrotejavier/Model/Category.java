package com.cafeteriamallorca.backcalderongarrotejavier.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Category {
    private Integer id;
    private String name;
    private LocalDateTime dateCreated;
    private java.time.LocalDateTime dateUpdated;
}
