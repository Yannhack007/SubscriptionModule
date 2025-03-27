package com.RMI.Subcription.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionResponseDTO {
    private UUID subscriptionId;
    private UUID userId;
    private String status;
    private LocalDateTime updateDate;
    private LocalDateTime endDate;
    private UUID plan;
    private UUID paymentMethod;
    
}
