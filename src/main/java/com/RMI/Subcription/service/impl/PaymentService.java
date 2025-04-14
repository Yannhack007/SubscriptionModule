package com.RMI.Subcription.service.impl;

import java.math.BigDecimal;
import java.util.UUID;

import com.RMI.Subcription.dto.PaymentMethodDTO;
import com.RMI.Subcription.service.PaymentInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.PaymentMethod;
import com.RMI.Subcription.repositories.PaymentRepository;

import lombok.Getter;
import lombok.Setter;

@Slf4j
@Getter
@Setter
@Service
public class PaymentService implements PaymentInterface {
    @Autowired
    private PaymentRepository paymentRepository;

    private PaymentMethod paymentMethod = new PaymentMethod();

    public PaymentMethod createPayment(PaymentMethodDTO paymentMethodDTO) {
        paymentMethod.setCardNumber(paymentMethodDTO.getCardNumber());
        paymentMethod.setExpirationDate(paymentMethodDTO.getExpirationDate());
        paymentMethod.setMethodType(paymentMethodDTO.getMethodType());
        paymentMethod.setPhoneNumber(paymentMethodDTO.getPhoneNumber());
        paymentMethod.setPaypalEmail(paymentMethodDTO.getPaypalEmail());
        paymentMethod.setCvc(paymentMethodDTO.getCvc());
        paymentMethod.setProvider(paymentMethodDTO.getProvider());
        paymentMethod.setPaymentMethodId(UUID.randomUUID());
        paymentMethod.setUserId(paymentMethodDTO.getUserId());
        return paymentRepository.save(paymentMethod);
    }

    public boolean processPayment(UUID userId, BigDecimal amount) {
        log.info("Processing payment for user {} with amount {}", userId, amount);
        return true;
    }

}
