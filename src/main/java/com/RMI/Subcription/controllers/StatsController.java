package com.RMI.Subcription.controllers;

import com.RMI.Subcription.dto.DistributionResponseDTO;
import com.RMI.Subcription.dto.SubscriptionResponseDTO;
import com.RMI.Subcription.service.impl.PlanService;
import com.RMI.Subcription.service.impl.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin
@Tag(name = "Stats Controller", description = "APIs for managing plans")
@Validated
public class StatsController {
    private final PlanService planService;
    private final SubscriptionService subscriptionService;
    @Autowired
    public StatsController(PlanService planService, SubscriptionService subscriptionService) {
        this.planService = planService;
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/distribution")
    @Operation(summary = "Get Plan Distribtion")
    public ResponseEntity<List<DistributionResponseDTO>> getDistribution() {
        List<SubscriptionResponseDTO> subscriptionResponseDTO= subscriptionService.getAllSubscriptions();
        Map<UUID, List<SubscriptionResponseDTO>> groupedByPlan = subscriptionResponseDTO.stream()
                .collect(Collectors.groupingBy(SubscriptionResponseDTO::getPlan));
        List<DistributionResponseDTO> distributionResponseDTOList = groupedByPlan.entrySet().stream()
                .map(entry -> new DistributionResponseDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(distributionResponseDTOList);
    }
}
