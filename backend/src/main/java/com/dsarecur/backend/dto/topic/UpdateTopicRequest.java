package com.dsarecur.backend.dto.topic;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateTopicRequest {

    @NotNull(message = "Topic id is required")
    @Min(value = 1, message = "Topic id must be valid")
    private Integer id;

    @NotBlank(message = "Topic name cannot be empty")
    @Size(min = 2, max = 100, message = "Topic name must be between 2 and 100 characters")
    private String name;

    private Integer parentId;

    @NotNull(message = "UserId is required")
    @Min(value = 1, message = "UserId must be valid")
    private Integer userId;

    // getters & setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}