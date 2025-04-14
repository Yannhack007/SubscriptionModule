package com.RMI.Subcription.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PaymentRequest {

    @JsonProperty("transaction_amount")
    @Schema(description = "Montant de la transaction", required = true)
    private double transactionAmount;

    @JsonProperty("transaction_currency")
    @Schema(description = "Devise de la transaction", hidden = true)
    private String transactionCurrency = "XAF";

    @JsonProperty("transaction_method")
    @Schema(description = "Méthode de transaction", hidden = true)
    private String transactionMethod = "MOBILE";

    @JsonProperty("transaction_reference")
    @Schema(description = "Référence unique de transaction", hidden = true)
    private String transactionReference = UUID.randomUUID().toString();

    @JsonProperty("payer_reference")
    @Schema(description = "Identifiant unique du payeur", hidden = true)
    private String payerReference = "415f56db-0343-47aa-a522-9b7b30ee8600";

    @JsonProperty("payer_name")
    @Schema(description = "Nom du payeur", required = true)
    private String payerName;

    @JsonProperty("payer_phone_number")
    @Schema(description = "Numéro de téléphone du payeur", required = true)
    private String payerPhoneNumber;

    @JsonProperty("payer_lang")
    @Schema(description = "Langue du payeur", required = true)
    private String payerLang;

    @JsonProperty("payer_email")
    @Schema(description = "Email du payeur", required = true)
    private String payerEmail;

    @JsonProperty("service_reference")
    @Schema(description = "Référence du service", hidden = true)
    private String serviceReference = "415f56db-0343-47aa-a522-9b7b30ee8600";

    @JsonProperty("service_name")
    @Schema(description = "Nom du service", hidden = true)
    private String serviceName = "YowYob Payment Service";

    @JsonProperty("service_description")
    @Schema(description = "Description du service", hidden = true)
    private String serviceDescription = "YowYob Payment Service";

    @JsonProperty("service_quantity")
    @Schema(description = "Quantité de service", hidden = true)
    private int serviceQuantity = 1;
}
