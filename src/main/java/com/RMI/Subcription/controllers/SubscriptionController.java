package com.RMI.Subcription.controllers;

import com.RMI.Subcription.dto.SubscriptionRequestDTO;
import com.RMI.Subcription.dto.SubscriptionResponseDTO;
import com.RMI.Subcription.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin
@Tag(name = "Subscription Controller", description = "APIs for managing subscriptions")
@Validated
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    @Operation(
            summary = "Create a new subscription",
            description = "Creates a new subscription with the provided details"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Subscription created successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SubscriptionResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input data",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
    public ResponseEntity<SubscriptionResponseDTO> createSubscription(
            @Valid @RequestBody SubscriptionRequestDTO request) {
        return new ResponseEntity<>(
                subscriptionService.createSubscription(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    @Operation(
            summary = "Get subscriptions list"
    )
    public ResponseEntity<List<SubscriptionResponseDTO>> getAllSubscriptions() {
        List<SubscriptionResponseDTO> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get subscriptions by Id"
    )
    public ResponseEntity<SubscriptionResponseDTO> getSubscriptionById(
            @PathVariable UUID id) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionById(id));
    }

    @PutMapping("/{id}/status")
    @Operation(
            summary = "Update subscription status"
    )
    public ResponseEntity<SubscriptionResponseDTO> updateSubscriptionStatus(
            @PathVariable UUID id,
            @RequestParam @NotNull String status) {
        return ResponseEntity.ok(subscriptionService.updateSubscriptionStatus(id, status));
    }

    @GetMapping("/status/{status}")
    @Operation(
            summary = "Get subscriptions by status"
    )
    public ResponseEntity<List<SubscriptionResponseDTO>> getSubscriptionsByStatus(@PathVariable String status) {
        List<SubscriptionResponseDTO> subscriptions = subscriptionService.getSubscriptionsByStatus(status);
        return ResponseEntity.ok(subscriptions);
    }


    @GetMapping("/payment-method/{paymentMethodId}")
    @Operation(
            summary = "Get subscriptions by payment method"
    )
    public ResponseEntity<List<SubscriptionResponseDTO>> getSubscriptionsByPaymentMethod(@PathVariable UUID paymentMethodId) {
        List<SubscriptionResponseDTO> subscriptions = subscriptionService.getSubscriptionsByPaymentMethod(paymentMethodId);
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/user/{userId}")
    @Operation(
            summary = "Get subscriptions by user id"
    )
    public ResponseEntity<List<SubscriptionResponseDTO>> getSubscriptionsByUserId(@PathVariable UUID userId) {
        List<SubscriptionResponseDTO> subscriptions = subscriptionService.getSubscriptionsByUserId(userId);
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/payment-date")
    @Operation(
            summary = "Get subscriptions by payment date"
    )
    public ResponseEntity<List<SubscriptionResponseDTO>> getSubscriptionsByPaymentDate(@RequestParam String date) {
        LocalDateTime paymentDate = LocalDateTime.parse(date);
        List<SubscriptionResponseDTO> subscriptions = subscriptionService.getSubscriptionsByPaymentDate(paymentDate);
        return ResponseEntity.ok(subscriptions);
    }
}
