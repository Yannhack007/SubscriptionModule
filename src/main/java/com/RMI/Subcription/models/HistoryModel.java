package com.RMI.Subcription.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Table("history")
public class HistoryModel {
    @PrimaryKey
    @Id
    @Column("user_id")
    private UUID userId;
    @Column("start_date")
    private LocalDateTime startDate;
    @Column("end_date")
    private LocalDateTime endDate;
    @Column("status")
    private String Status;
    @Column("method_type")
    private String methodType;
    @Column("payment_id")
    private UUID paymentId;
    @Column("plan_id")
    private UUID planId;
    @Column("payment_method_id")
    private UUID paymentMethodId;
}
