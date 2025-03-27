package com.RMI.Subcription.models;

import com.RMI.Subcription.dto.promoRequestDTO;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Table("promo_code")
public class Promo_code {
    @PrimaryKey
    private UUID id;
    private String code;
    private Integer validity;
    private Integer discount;
    private String status;
    @Column("start_date")
    private LocalDateTime startDate;

    public Promo_code(promoRequestDTO dto) {
        this.code=dto.getCode();
        this.validity=dto.getValidity();
        this.discount=dto.getDiscount();
        this.status= String.valueOf(dto.getStatus());
        this.startDate=dto.getStartDate();
    }
    public Promo_code(){}
}
