package com.RMI.Subcription.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.HistoryModel;
import com.RMI.Subcription.repositories.HistoryRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Slf4j
@Service
@RequiredArgsConstructor
public class HistoryService {
    private HistoryModel historyModel;

    @Autowired
    public HistoryRepository historyRepository;

    public List<HistoryModel> getHistory (UUID userId){
        return historyRepository.findByUserId(userId);
    }

    public HistoryModel saveHistory(HistoryModel historyDTO){
        return historyRepository.save(historyDTO);
    }
    public void logStatusChange(UUID subscriptionId, String oldStatus, String newStatus) {
        log.info("Logging status change for subscription ID: {} from {} to {}", subscriptionId, oldStatus, newStatus);

        HistoryModel history = HistoryModel.builder()
                .paymentId(subscriptionId)
                .Status(newStatus)
                .startDate(LocalDateTime.now())
                .build();
        historyRepository.save(history);
        log.info("Status change logged successfully for subscription ID: {}", subscriptionId);
    }
}
