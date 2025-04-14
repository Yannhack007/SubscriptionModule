package com.RMI.Subcription.controllers;

import com.RMI.Subcription.dto.payment.PaymentRequest;
import com.RMI.Subcription.dto.payment.PaymentResponse;
import com.RMI.Subcription.dto.payment.PaymentStatusRequest;
import com.RMI.Subcription.dto.payment.PaymentStatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@CrossOrigin
@RequestMapping("/api/payment-client")
@Tag(name = "Payment", description = "Payment management APIs")
public class PaymentController {
    private final WebClient paymentServiceWebClient;

    public PaymentController(WebClient paymentServiceWebClient) {
        this.paymentServiceWebClient = paymentServiceWebClient;
    }

    @PostMapping("/payin")
    @Operation(summary = "Payin an order",
            description = "Pay your bill")
    @ApiResponse(responseCode = "200", description = "Pay order started")
    public ResponseEntity<PaymentResponse> createPaymentRequest(
            @RequestBody PaymentRequest request) {
        try {
            PaymentResponse response = paymentServiceWebClient.post()
                    .uri("/payin")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(PaymentResponse.class)
                    .block(); // BLOQUANT

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/transactions/{transaction_code}/status")
    @Operation(summary = "Get payment status of an order",
            description = "Get the payment status of your bill")
    @ApiResponse(responseCode = "200", description = "Get the payment status")
    public ResponseEntity<PaymentStatusResponse> getPaymentStatus(
            @PathVariable String transaction_code) {
        try {
            PaymentStatusRequest statusRequest = new PaymentStatusRequest();
            statusRequest.setTransactionCode(transaction_code);

            PaymentStatusResponse response = paymentServiceWebClient.get()
                    .uri("/transactions/{transaction_code}/status", transaction_code)
                    .retrieve()
                    .bodyToMono(PaymentStatusResponse.class)
                    .block(); // BLOQUANT

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
