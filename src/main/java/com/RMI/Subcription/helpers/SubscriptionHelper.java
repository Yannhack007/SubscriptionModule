package com.RMI.Subcription.helpers;

import com.RMI.Subcription.dto.SubscriptionResponseDTO;
import com.RMI.Subcription.models.SubscriptionsModel;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionHelper {
    public SubscriptionHelper(){}
    public SubscriptionResponseDTO toDTO(SubscriptionsModel model){
        SubscriptionResponseDTO dto = new SubscriptionResponseDTO();
        dto.setSubscriptionId(model.getSubscriptionId());
        dto.setUserId(model.getUserId());
        dto.setStatus(model.getStatus());
        dto.setUpdateDate(model.getUpdateDate());
        dto.setEndDate(model.getEndDate());
        dto.setPlan(model.getPlanId());
        dto.setPaymentMethod(model.getPaymentMethodId());
        return dto;
    }
}
