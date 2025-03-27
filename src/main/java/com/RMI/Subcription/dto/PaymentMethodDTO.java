package com.RMI.Subcription.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodDTO {
    private String methodType;
    private String cardNumber;
    private String expirationDate;
    private String cvc;
    private String provider;
    private String phoneNumber;
    private String paypalEmail;
    private UUID userId;
}
