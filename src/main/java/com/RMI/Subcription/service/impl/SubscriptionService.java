package com.RMI.Subcription.service.impl;

import com.RMI.Subcription.dto.SubscriptionRequestDTO;
import com.RMI.Subcription.dto.SubscriptionResponseDTO;
import com.RMI.Subcription.dto.PaymentMethodDTO;
import com.RMI.Subcription.exceptions.InvalidStatusTransitionException;
import com.RMI.Subcription.exceptions.ResourceNotFoundException;
import com.RMI.Subcription.exceptions.SubscriptionCreationException;
import com.RMI.Subcription.helpers.SubscriptionHelper;
import com.RMI.Subcription.models.HistoryModel;
import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.repositories.SubscriptionRepository;
import com.RMI.Subcription.service.SubscriptionInterface;
import com.RMI.Subcription.types.SubscriptionStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class SubscriptionService implements SubscriptionInterface {

    private final PaymentService paymentService;
    private final HistoryService historyService;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionHelper subscriptionHelper;

    private static final Map<String, Set<String>> VALID_TRANSITIONS = new HashMap<>();

    static {
        // Définir les transitions valides entre statuts
        VALID_TRANSITIONS.put("PENDING", Set.of("ACTIVE", "CANCELLED"));
        VALID_TRANSITIONS.put("ACTIVE", Set.of("SUSPENDED", "CANCELLED"));
        VALID_TRANSITIONS.put("SUSPENDED", Set.of("ACTIVE", "CANCELLED"));
        VALID_TRANSITIONS.put("CANCELLED", Set.of()); // Une fois annulé, pas de retour possible
    }

    @Autowired
    public SubscriptionService(
            PaymentService paymentService,
            HistoryService historyService,
            SubscriptionRepository subscriptionRepository,
            SubscriptionHelper subscriptionHelper) {
        this.paymentService = paymentService;
        this.historyService = historyService;
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionHelper=subscriptionHelper;
    }

    public SubscriptionResponseDTO createSubscription(SubscriptionRequestDTO request) {
        log.info("Creating new subscription for user: {}", request.getUserId());

        try {

            // Créer le mode de paiement
            UUID paymentMethodId = paymentService.createPayment(
                    PaymentMethodDTO.builder()
                            .methodType(request.getMethodType())
                            .cardNumber(request.getCardNumber())
                            .expirationDate(request.getExpirationDate())
                            .cvc(request.getCvc())
                            .provider(request.getProvider())
                            .phoneNumber(request.getPhoneNumber())
                            .paypalEmail(request.getPaypalEmail())
                            .userId(request.getUserId())
                            .build()
            ).getPaymentMethodId();

            // Enregistrer l'historique
            historyService.saveHistory(HistoryModel.builder()
                    .userId(request.getUserId())
                    .planId(request.getPlanId())
                    .endDate(request.getEndDate())
                    .methodType(request.getMethodType())
                    .paymentMethodId(paymentMethodId)
                    .Status(request.getStatus())
                    .startDate(request.getStartDate())
                    .build());

            // Créer la souscription
            SubscriptionsModel subscription = subscriptionRepository.save(
                    SubscriptionsModel.builder()
                            .userId(request.getUserId())
                            .subscriptionId(UUID.randomUUID())
                            .paymentDate(request.getStartDate())
                            .updateDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .planId(request.getPlanId())
                            .status(String.valueOf(SubscriptionStatus.ACTIVE))
                            .paymentMethodId(paymentMethodId)
                            .build()
            );


            log.info("Successfully created subscription with ID: {}", subscription.getSubscriptionId());
            return subscriptionHelper.toDTO(subscription);

        } catch (Exception e) {
            log.error("Error creating subscription for user: {}", request.getUserId(), e);
            throw new SubscriptionCreationException("Failed to create subscription", e);
        }
    }

    public List<SubscriptionResponseDTO> getAllSubscriptions() {
        List<SubscriptionResponseDTO> response = new ArrayList<>();
        subscriptionRepository.findAll().forEach(subscription ->
                response.add(subscriptionHelper.toDTO(subscription))
        );
        return response;
    }

    public SubscriptionResponseDTO getSubscriptionById(UUID id) {
        log.info("Fetching subscription with ID: {}", id);
        return subscriptionRepository.findById(id)
                .map(subscriptionHelper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id: " + id));
    }

    public List<SubscriptionResponseDTO> getSubscriptionsByStatus(String status) {
        log.info("Fetching subscriptions with status: {}", status);
        return subscriptionRepository.findByStatus(status).stream()
                .map(subscriptionHelper::toDTO)
                .collect(Collectors.toList());
    }

    public List<SubscriptionResponseDTO> getSubscriptionsByPaymentMethod(UUID paymentMethodId) {
        log.info("Fetching subscriptions for payment method: {}", paymentMethodId);
        return subscriptionRepository.findByPaymentMethodId(paymentMethodId).stream()
                .map(subscriptionHelper::toDTO)
                .collect(Collectors.toList());
    }

    public List<SubscriptionResponseDTO> getSubscriptionsByUserId(UUID userId) {
        log.info("Fetching subscriptions for user: {}", userId);
        return subscriptionRepository.findByUserId(userId).stream()
                .map(subscriptionHelper::toDTO)
                .collect(Collectors.toList());
    }

    public List<SubscriptionResponseDTO> getSubscriptionsByPaymentDate(LocalDateTime date) {
        log.info("Fetching subscriptions for payment date: {}", date);
        return subscriptionRepository.findByPaymentDate(date).stream()
                .map(subscriptionHelper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SubscriptionResponseDTO updateSubscriptionStatus(UUID id, String status) {
        log.info("Updating subscription status, ID: {}, new status: {}", id, status);

        SubscriptionsModel subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id: " + id));

        validateStatusTransition(subscription.getStatus(), status);

        subscription.setStatus(status);
        subscription.setUpdateDate(LocalDateTime.now());

        SubscriptionsModel updatedSubscription = subscriptionRepository.save(subscription);

        // Mettre à jour l'historique
        historyService.logStatusChange(id, subscription.getStatus(), status);

        log.info("Successfully updated subscription status, ID: {}", id);
        return subscriptionHelper.toDTO(updatedSubscription);
    }

    private void validateStatusTransition(String currentStatus, String newStatus) {
        if (!isValidStatusTransition(currentStatus, newStatus)) {
            throw new InvalidStatusTransitionException(
                    String.format("Invalid status transition from %s to %s", currentStatus, newStatus)
            );
        }
    }

    public static boolean isValidStatusTransition(String currentStatus, String newStatus) {
        return VALID_TRANSITIONS.getOrDefault(currentStatus, new HashSet<>()).contains(newStatus);
    }
}