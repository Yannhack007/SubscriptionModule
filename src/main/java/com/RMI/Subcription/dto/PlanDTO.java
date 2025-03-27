package com.RMI.Subcription.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanDTO {
    private String category;

    private List<String> description;

    private String content;

    private BigDecimal amount;

    private Integer duration;

}
