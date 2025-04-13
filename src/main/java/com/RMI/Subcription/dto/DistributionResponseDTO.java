package com.RMI.Subcription.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DistributionResponseDTO {
    private UUID planId; // Identifiant du plan
    private List<SubscriptionResponseDTO> subscriptions; // Liste des souscriptions associées à ce plan
}
