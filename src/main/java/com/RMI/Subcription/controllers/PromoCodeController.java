package com.RMI.Subcription.controllers;

import com.RMI.Subcription.dto.promoRequestDTO;
import com.RMI.Subcription.models.Promo_code;
import com.RMI.Subcription.service.impl.Promo_codeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/promocodes")
@Tag(name = "Promo code Controller", description = "APIs for managing promotion")
@RequiredArgsConstructor
public class PromoCodeController {
    private final Promo_codeService promoCodeService;

    @PostMapping("/batch")
    @Operation(
            summary = "Create multi-promotion code",
            description = "Allows creating multiple promotion codes at once.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid request data")
            }
    )

    public ResponseEntity<List<Promo_code>> savePromoCodes(@RequestBody List<promoRequestDTO> promoCodes) {
        List<Promo_code> savedPromoCodes = promoCodeService.savePromocode(promoCodes);
        return ResponseEntity.ok(savedPromoCodes);
    }
    @PostMapping
    @Operation(
            summary = "Create a promotion code",
            description = "Creates a new promotion code and returns the saved entity.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Promotion code details",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = promoRequestDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully created", content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Promo_code.class)
                    )),
                    @ApiResponse(responseCode = "400", description = "Invalid request data")
            }
    )
    public ResponseEntity<Promo_code> createPromoCode(@RequestBody promoRequestDTO promoCode) {
        Promo_code savedPromoCode = promoCodeService.createPromoCode(promoCode);
        return ResponseEntity.ok(savedPromoCode);
    }

    @GetMapping
    @Operation(
            summary = "Get promotion code list"
    )
    public ResponseEntity<List<Promo_code>> getAllPromoCodes() {
        List<Promo_code> promoCodes = promoCodeService.findAll();
        return ResponseEntity.ok(promoCodes);
    }

    @PutMapping("/disable/{id}")
    @Operation(
            summary = "Disable promotion code"
    )
    public ResponseEntity<String> deletePromoCode(@PathVariable UUID id) {
        String message = promoCodeService.disablePromo(id);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/expire/{id}")
    @Operation(summary = "Mark a promotion code as expired")
    public ResponseEntity<String> markPromoCodeAsExpired(@PathVariable UUID id) {
        String message = promoCodeService.markAsExpired(id);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/use/{id}")
    @Operation(summary = "Mark a promotion code as used")
    public ResponseEntity<String> markPromoCodeAsUsed(@PathVariable UUID id) {
        String message = promoCodeService.markAsUsed(id);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/active/{id}")
    @Operation(summary = "Mark a promotion code as actived")
    public ResponseEntity<String> markPromoCodeAsActived(@PathVariable UUID id) {
        String message = promoCodeService.markAsActived(id);
        return ResponseEntity.ok(message);
    }
}
