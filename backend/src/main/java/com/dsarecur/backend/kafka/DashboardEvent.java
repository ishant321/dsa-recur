package com.dsarecur.backend.kafka;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class DashboardEvent {

    public enum EntityType {
        TOPIC,
        QUESTION,
        NOTE,
        THEORY
    }

    private String userId;
    private Integer entityId;
    private EntityType entityType;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastVisited;

    public DashboardEvent(String userId, Integer entityId, EntityType entityType, LocalDateTime lastVisited) {
        this.userId = userId;
        this.entityId = entityId;
        this.entityType = entityType;
        this.lastVisited = lastVisited;
    }

    public DashboardEvent() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public LocalDateTime getLastVisited() {
        return lastVisited;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public EntityType getEntityType() {
        return entityType;
    }

    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }

    public void setLastVisited(LocalDateTime lastVisited) {
        this.lastVisited = lastVisited;
    }
}
