package com.dsarecur.dashboard.model;

import com.dsarecur.dashboard.constants.EntityType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class UserEntityActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public UserEntityActivity(Integer id, String userId, EntityType entityType, Integer entityId, Integer visitCount, LocalDateTime lastVisitedAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.entityType = entityType;
        this.entityId = entityId;
        this.visitCount = visitCount;
        this.lastVisitedAt = lastVisitedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UserEntityActivity() {
    }

    private String userId;

    @Enumerated(EnumType.STRING)
    private EntityType entityType;

    private Integer entityId;

    private Integer visitCount = 0;

    private LocalDateTime lastVisitedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public EntityType getEntityType() {
        return entityType;
    }

    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public Integer getVisitCount() {
        return visitCount;
    }

    public void setVisitCount(Integer visitCount) {
        this.visitCount = visitCount;
    }

    public LocalDateTime getLastVisitedAt() {
        return lastVisitedAt;
    }

    public void setLastVisitedAt(LocalDateTime lastVisitedAt) {
        this.lastVisitedAt = lastVisitedAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
