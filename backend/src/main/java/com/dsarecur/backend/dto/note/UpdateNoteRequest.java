package com.dsarecur.backend.dto.note;

import com.dsarecur.backend.constant.Difficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateNoteRequest {

    @NotNull(message = "Note id is required")
    @Min(value = 1, message = "Note id must be valid")
    private Integer id;


    @NotBlank(message = "Content is required")
    @Size(min = 2, max = 100, message = "Content length must be between 2 and 100 characters")
    private String content;

    public UpdateNoteRequest(Integer id, String content, Integer questionId) {
        this.id = id;
        this.content = content;
        this.questionId = questionId;
    }

    public UpdateNoteRequest() {
    }

    @NotNull(message = "Question id is required")
    @Min(value = 1, message = "Question id must be valid")
    private Integer questionId;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
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
}
