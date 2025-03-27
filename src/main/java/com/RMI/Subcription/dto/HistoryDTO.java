package com.RMI.Subcription.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryDTO {
    private UUID userId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private String methodType;
    private UUID paymentId;
    private UUID paymentMethodId;
    private String category;
    private BigDecimal amount;
}
