package com.RMI.Subcription.helpers;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpHeaders;

public class Api {
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> APIGET(String url, HttpHeaders headers) {
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
    }

    public ResponseEntity<String> APIPOST(String url, HttpHeaders headers, Object requestBody) {
        HttpEntity<Object> entity = new HttpEntity<>(requestBody);
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
        );
    }

    public ResponseEntity<String> APIPUT(String url, HttpHeaders headers, Object requestBody) {
        HttpEntity<Object> entity = new HttpEntity<>(requestBody);
        return restTemplate.exchange(
                url,
                HttpMethod.PUT,
                entity,
                String.class
        );
    }

    public ResponseEntity<String> APIDELETE(String url, HttpHeaders headers) {
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                entity,
                String.class
        );
    }

    public ResponseEntity<String> APIPATCH(String url, HttpHeaders headers, Object requestBody) {
        HttpEntity<Object> entity = new HttpEntity<>(requestBody);
        return restTemplate.exchange(
                url,
                HttpMethod.PATCH,
                entity,
                String.class
        );
    }
}