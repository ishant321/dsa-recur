package com.dsarecur.backend.dto.theory;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateTheoryRequest {

    @NotNull(message = "Theory id is required")
    @Min(value = 1, message = "Theory id must be valid")
    private Integer id;

    @NotBlank(message = "Theory name cannot be empty")
    @Size(min = 2, max = 100, message = "Theory name must be between 2 and 100 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 2, max = 100, message = "Content length must be between 2 and 100 characters")
    private String content;

    public UpdateTheoryRequest() {
    }

    public UpdateTheoryRequest(Integer id, String title, String content, Integer topicId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.topicId = topicId;
    }

    private Integer topicId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }
}
