package com.dsarecur.backend.dto.question;

import com.dsarecur.backend.constant.Difficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateQuestionRequest {

    @NotNull(message = "Question id is required")
    @Min(value = 1, message = "Question id must be valid")
    private Integer id;

    @NotBlank(message = "Question name cannot be empty")
    @Size(min = 2, max = 100, message = "Question name must be between 2 and 100 characters")
    private String title;

    @NotBlank(message = "Link cannot be empty")
    private String link;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    @NotNull(message = "Topic id is required")
    @Min(value = 1, message = "Topic id must be valid")
    private Integer topicId;

    // Constructors
    public UpdateQuestionRequest() {
    }

    public UpdateQuestionRequest(
            Integer id,
            String title,
            String link,
            Difficulty difficulty,
            Integer topicId
    ) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.difficulty = difficulty;
        this.topicId = topicId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

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
