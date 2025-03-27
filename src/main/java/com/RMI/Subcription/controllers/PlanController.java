package com.RMI.Subcription.controllers;

import com.RMI.Subcription.dto.PlanDTO;
import com.RMI.Subcription.models.PlanModel;
import com.RMI.Subcription.service.PlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Plan Controller", description = "APIs for managing plans")
@Validated
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    @Operation(summary = "Get All Plan")
    public ResponseEntity<List<PlanModel>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Plan By ID")
    public ResponseEntity<PlanModel> getPlanById(@PathVariable UUID id) {
        return ResponseEntity.ok(planService.getPlanById(id));
    }

    @PostMapping
    @Operation(summary = "Create Plan")
    public ResponseEntity<PlanModel> createPlan(@RequestBody PlanDTO planDTO) {
        PlanModel createdPlan = planService.createPlan(planDTO);
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{planId}")
    @Operation(summary = "Update Plan")
    public ResponseEntity<PlanModel> updatePlan(@PathVariable UUID planId,@RequestBody PlanDTO plan   ) {
        PlanModel updatedPlan = planService.updatePlan(planId,plan);
        return ResponseEntity.ok(updatedPlan);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get Plans By Category")
    public ResponseEntity<List<PlanDTO>> getPlansByCategory(@PathVariable String category) {
        return ResponseEntity.ok(planService.getByCategory(category));
    }
}
