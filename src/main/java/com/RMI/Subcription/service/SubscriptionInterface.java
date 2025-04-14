package com.RMI.Subcription.service;

import com.RMI.Subcription.dto.SubscriptionRequestDTO;
import com.RMI.Subcription.dto.SubscriptionResponseDTO;

import java.time.LocalDateTime;
import java.util.*;

public interface SubscriptionInterface {
    SubscriptionResponseDTO createSubscription(SubscriptionRequestDTO request);
    List<SubscriptionResponseDTO> getAllSubscriptions();
    SubscriptionResponseDTO getSubscriptionById(UUID id);
    List<SubscriptionResponseDTO> getSubscriptionsByStatus(String status);
    List<SubscriptionResponseDTO> getSubscriptionsByPaymentMethod(UUID paymentMethodId);
    List<SubscriptionResponseDTO> getSubscriptionsByUserId(UUID userId);
    List<SubscriptionResponseDTO> getSubscriptionsByPaymentDate(LocalDateTime date);
    SubscriptionResponseDTO updateSubscriptionStatus(UUID id, String status);
}
