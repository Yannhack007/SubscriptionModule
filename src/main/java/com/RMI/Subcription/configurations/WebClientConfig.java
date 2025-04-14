package com.RMI.Subcription.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder().baseUrl("http://localhost:5000").build();
    }

    @Bean
    public WebClient paymentServiceWebClient() {
        return WebClient.builder()
                .baseUrl("https://gateway.yowyob.com/payment-service/ciOlTqLF7vUBv8jfTh9RfOLCKLiLngTw")
                .build();
    }
}
