package com.dsarecur.dashboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class home {
    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }
}

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzQGdtYWlsLmNvbSIsImlhdCI6MTc3OTIxMTU4MiwiZXhwIjoxNzc5MzE5NTgyfQ.FiuWzZJ1Qki6XYXfjzvN7bqkdKaqs3P57vIeHvidEW4