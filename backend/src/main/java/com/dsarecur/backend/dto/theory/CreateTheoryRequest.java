package com.dsarecur.backend.dto.theory;

import jakarta.validation.constraints.NotBlank;

public class CreateTheoryRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    private Integer topicId;

    public CreateTheoryRequest(String title, String content, Integer topicId) {
        this.title = title;
        this.content = content;
        this.topicId = topicId;
    }

    public CreateTheoryRequest() {
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
