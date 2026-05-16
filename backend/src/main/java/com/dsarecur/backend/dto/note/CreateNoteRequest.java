package com.dsarecur.backend.dto.note;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateNoteRequest {

    @NotBlank(message = "Title is required")
    private String content;

    @NotNull(message = "TopicId is required")
    private Integer questionId;

    public CreateNoteRequest(String content, Integer questionId) {
        this.content = content;
        this.questionId = questionId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public CreateNoteRequest() {
    }
}
