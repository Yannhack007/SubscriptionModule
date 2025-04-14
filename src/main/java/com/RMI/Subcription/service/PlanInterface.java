package com.RMI.Subcription.service;

import com.RMI.Subcription.dto.PlanDTO;
import com.RMI.Subcription.models.PlanModel;

import java.util.*;

public interface PlanInterface {
    PlanModel createPlan(PlanDTO model);
    List<PlanModel> getAllPlans();
    PlanModel getPlanById(UUID id);
    PlanModel updatePlan(UUID id, PlanDTO model);
    void deletePlan(UUID id);
    List <PlanDTO> getByCategory(String category);
}
