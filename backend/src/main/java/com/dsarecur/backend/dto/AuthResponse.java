package com.dsarecur.backend.dto;

import org.springframework.http.HttpStatus;

public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
