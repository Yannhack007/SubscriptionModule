package com.RMI.Subcription.service;

import com.RMI.Subcription.dto.PaymentMethodDTO;
import com.RMI.Subcription.models.PaymentMethod;

import java.math.BigDecimal;
import java.util.UUID;

public interface PaymentInterface {
    PaymentMethod createPayment(PaymentMethodDTO paymentMethodDTO);
    boolean processPayment(UUID userId, BigDecimal amount);
}
