package com.RMI.Subcription.helpers;

import com.RMI.Subcription.models.SubscriptionsModel;
import com.RMI.Subcription.repositories.SubscriptionRepository;
import com.RMI.Subcription.types.SubscriptionStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Slf4j
public class CleanOldPendingSubscriptions {

    private final SubscriptionRepository subscriptionRepository;
    public CleanOldPendingSubscriptions(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanOldPendingSubscriptions() {
        LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);

        List<SubscriptionsModel> oldPendingSubscriptions =
                subscriptionRepository.findByStatusAndCreatedAtBefore(String.valueOf(SubscriptionStatus.PENDING), threeDaysAgo);

        if (!oldPendingSubscriptions.isEmpty()) {
            subscriptionRepository.deleteAll(oldPendingSubscriptions);
            log.info("PENDING subscriptions deleted");
        }
    }
}
