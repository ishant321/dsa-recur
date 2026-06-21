package com.dsarecur.backend.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class DashboardEventProducer {

    private static final String TOPIC = "dashboard-events";

    @Autowired
    private KafkaTemplate<String, DashboardEvent> kafkaTemplate;

    public void publishEvent(DashboardEvent event) {
        kafkaTemplate.send("dashboard-events", event)
                .whenComplete((res, ex) -> {
                    if (ex != null) {
                        System.out.println("FAILED: " + ex.getMessage());
                    } else {
                        System.out.println("SENT offset=" + res.getRecordMetadata().offset());
                    }
                });
    }
}