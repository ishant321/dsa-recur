package com.dsarecur.dashboard.debug;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class DebugBeanCheck {

    public DebugBeanCheck(ObjectMapper objectMapper) {
        System.out.println("✔ ObjectMapper injected successfully: " + objectMapper);
    }
}