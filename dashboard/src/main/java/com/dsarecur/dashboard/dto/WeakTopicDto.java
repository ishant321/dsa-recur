package com.dsarecur.dashboard.dto;

import java.time.LocalDateTime;

public class WeakTopicDto {
    Integer topicId;
    LocalDateTime lastVisited;

    public WeakTopicDto() {
    }

    public WeakTopicDto(Integer topicId, LocalDateTime lastVisited) {
        this.topicId = topicId;
        this.lastVisited = lastVisited;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public LocalDateTime getLastVisited() {
        return lastVisited;
    }

    public void setLastVisited(LocalDateTime lastVisited) {
        this.lastVisited = lastVisited;
    }
}
