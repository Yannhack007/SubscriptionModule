package com.RMI.Subcription.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.SubscriptionsModel;
import org.springframework.data.cassandra.repository.Query;


public interface SubscriptionRepository extends CassandraRepository<SubscriptionsModel,UUID>{
    List<SubscriptionsModel> findByStatus(String status);
    List<SubscriptionsModel> findByPaymentMethodId(UUID paymentMethodId);
    List<SubscriptionsModel> findByUserId(UUID userId);
    List<SubscriptionsModel> findByPaymentDate(LocalDateTime date);
    @Query("SELECT * FROM subscriptions WHERE status = ?0 AND created_at < ?1 ALLOW FILTERING")
    List<SubscriptionsModel> findByStatusAndCreatedAtBefore(String status, LocalDateTime date);
    
}