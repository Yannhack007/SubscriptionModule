package com.RMI.Subcription.service;

import com.RMI.Subcription.models.HistoryModel;

import java.util.*;

public interface HistoryInterface {
    List<HistoryModel> getHistory(UUID userId);
    void saveHistory(HistoryModel historyModel);
}
