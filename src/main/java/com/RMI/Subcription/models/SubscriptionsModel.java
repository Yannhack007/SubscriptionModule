package com.RMI.Subcription.models;

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
@Table("subscriptions")
public class SubscriptionsModel {
    @Column("user_id")
    private UUID userId;

    @PrimaryKey
    @Id
    @Column("subscription_id")
    private UUID subscriptionId;
    @Column("payment_date")
    private LocalDateTime paymentDate;
    @Column("update_date")
    private LocalDateTime updateDate;
    @Column("end_date")
    private LocalDateTime endDate;
    @Column("plan_id")
    private UUID planId;

    private String status;
    @Column("payment_method_id")
    private UUID paymentMethodId;
}
