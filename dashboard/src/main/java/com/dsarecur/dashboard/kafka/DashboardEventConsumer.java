package com.dsarecur.dashboard.kafka;

import com.dsarecur.dashboard.service.UserActivityDailyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class DashboardEventConsumer {

    private final ObjectMapper objectMapper;
    private final UserActivityDailyService userActivityDailyService;

    public DashboardEventConsumer(ObjectMapper objectMapper,
                                  UserActivityDailyService userActivityDailyService) {
        this.objectMapper = objectMapper;
        this.userActivityDailyService = userActivityDailyService;
    }

    @KafkaListener(topics = "dashboard-events", groupId = "dashboard-group")
    public void consume(String eventJson) {

        System.out.println("🔥 Received event from Kafka: " + eventJson);

        try {
            DashboardEvent event =
                    objectMapper.readValue(eventJson, DashboardEvent.class);

            userActivityDailyService.processEvent(event);

        } catch (Exception e) {
            System.err.println("❌ Failed to parse Kafka event: " + eventJson);
            e.printStackTrace();
        }
    }
}
