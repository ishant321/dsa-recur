package com.dsarecur.backend.dto.topic;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateTopicRequest {

    @NotBlank(message = "Topic name cannot be empty")
    @Size(min = 2, max = 100, message = "Topic name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "UserId is required")
    @Min(value = 1, message = "UserId must be a positive number")
    private Integer userId;

    // optional field (can be null)
    private Integer parentId;

    // getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}