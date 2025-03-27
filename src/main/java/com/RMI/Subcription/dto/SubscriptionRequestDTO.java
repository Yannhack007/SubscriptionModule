package com.RMI.Subcription.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequestDTO {
    @NotNull(message = "User ID cannot be null")
    private UUID userId;

    @NotBlank(message = "Category cannot be blank")
    @Size(max = 50, message = "Category cannot exceed 50 characters")
    private String category;

    @NotNull(message = "Amount cannot be null")
    private BigDecimal amount;

    @NotNull(message = "Duration cannot be null")
    private Integer duration;

    @NotNull(message = "Start date cannot be null")
    private LocalDateTime startDate;

    @NotNull(message = "End date cannot be null")
    private LocalDateTime endDate;

    @NotBlank(message = "Status cannot be blank")
    private String status;

    @NotBlank(message = "Method type cannot be blank")
    private String methodType;

    private String cardNumber;

    private String expirationDate;

    private String cvc;

    private String provider;

    private String phoneNumber;

    private String paypalEmail;

    @NotBlank(message = "Plan content cannot be blank")
    private String planContent;

    @NotNull(message = "Plan Id cannot be null")
    private UUID planId;

    private List<String> descriptionList;
}

