package com.RMI.Subcription.dto;
import com.RMI.Subcription.types.PromoStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@Schema(description = "DTO for creating a promotion code")
public class promoRequestDTO {
    @Schema(description = "The unique code of the promotion", example = "PROMO123")
    private String code;
    @Schema(description = "Validity (days)", example = "30")
    private Integer validity;
    @Schema(description = "Discount percentage", example = "20")
    private Integer discount;
    @Schema(description = "Status of the promotion", example = "ACTIVE")
    private PromoStatus status;
    private LocalDateTime startDate;
}
