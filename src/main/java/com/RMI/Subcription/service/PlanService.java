package com.RMI.Subcription.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.RMI.Subcription.dto.PlanDTO;
import com.RMI.Subcription.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.repositories.PlanRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepository;
    
    public PlanModel createPlan(PlanDTO dto) {
        PlanModel model= new PlanModel(dto);
        return planRepository.save(model);
    };

    public List <PlanModel> getAllPlans() {
        return planRepository.findAll();
    }

    public PlanModel getPlanById(UUID id) {
        PlanModel existingPlan = planRepository.findByPlanId(id);
        if (existingPlan == null) {
            throw new ResourceNotFoundException("Plan with ID: " + id+ " does not exist");
        }
        return planRepository.findByPlanId(id);
    }

    public List <PlanDTO> getByCategory(String category) {
        return planRepository.findByCategory(category);
    }

    public PlanModel updatePlan(UUID planId,PlanDTO planDTO) {
        PlanModel existingPlan = planRepository.findByPlanId(planId);

        if (existingPlan == null) {
            throw new ResourceNotFoundException("Plan with ID: " + planId+ " does not exist");
        }

        if (planDTO.getCategory() != null) existingPlan.setCategory(planDTO.getCategory());
        if (planDTO.getAmount() != null) existingPlan.setAmount(planDTO.getAmount() );
        if (planDTO.getDuration() != null) existingPlan.setDuration(planDTO.getDuration());
        if (planDTO.getContent() != null) existingPlan.setContent(planDTO.getContent());
        if (planDTO.getDescription() != null) existingPlan.setDescription(planDTO.getDescription());

        return planRepository.save(existingPlan);
    }

    public void deletePlan(UUID planId) {
        PlanModel existingPlan = planRepository.findByPlanId(planId);
        if (existingPlan == null) {
            throw new ResourceNotFoundException("Plan with ID: " + planId+ " does not exist");
        }
        planRepository.deleteById(planId);
    }


}
