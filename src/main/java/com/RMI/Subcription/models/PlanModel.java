package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.RMI.Subcription.dto.PlanDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("plans")
public class PlanModel {
    @PrimaryKey
    @Id
    @Column("plan_id")
    private UUID planId;
    @Indexed
    private String category;

    private List<String> description;

    private String content;

    private BigDecimal amount;

    private Integer duration;

    public PlanModel() {

    }
    public PlanModel(PlanDTO planDTO){
        this.amount=planDTO.getAmount();
        this.category=planDTO.getCategory();
        this.content=planDTO.getContent();
        this.description=planDTO.getDescription();
        this.duration=planDTO.getDuration();
        this.planId=UUID.randomUUID();
    }
}
