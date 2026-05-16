package com.dsarecur.backend.dto.question;

import com.dsarecur.backend.constant.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateQuestionRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Link is required")
    private String link;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    @NotNull(message = "TopicId is required")
    private Integer topicId;

    // Constructors
    public CreateQuestionRequest() {
    }

    public CreateQuestionRequest(String title, String link, Difficulty difficulty, Integer topicId) {
        this.title = title;
        this.link = link;
        this.difficulty = difficulty;
        this.topicId = topicId;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }
}