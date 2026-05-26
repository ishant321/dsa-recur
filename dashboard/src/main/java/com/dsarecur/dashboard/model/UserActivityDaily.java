package com.dsarecur.dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class UserActivityDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String user_id;

    @NotNull
    private LocalDate date; // Activity date

    @NotNull
    private Integer totalVisits; // Total interactions that day

    @NotNull
    private Integer topicVisits; // Topic page visits

    @NotNull
    private Integer questionVisits; // Question page visits

    @NotNull
    private Integer theoryVisits; // Theory page visits

    @NotNull
    private Integer notesVisits; // Notes page visits

    @NotNull
    private LocalDateTime createdAt; // Record creation time

    public UserActivityDaily() {
    }

    public UserActivityDaily(Integer id, String user_id, LocalDate date, Integer totalVisits, Integer topicVisits, Integer questionVisits, Integer theoryVisits, Integer notesVisits, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user_id = user_id;
        this.date = date;
        this.totalVisits = totalVisits;
        this.topicVisits = topicVisits;
        this.questionVisits = questionVisits;
        this.theoryVisits = theoryVisits;
        this.notesVisits = notesVisits;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getTotalVisits() {
        return totalVisits;
    }

    public void setTotalVisits(Integer totalVisits) {
        this.totalVisits = totalVisits;
    }

    public Integer getTopicVisits() {
        return topicVisits;
    }

    public void setTopicVisits(Integer topicVisits) {
        this.topicVisits = topicVisits;
    }

    public Integer getQuestionVisits() {
        return questionVisits;
    }

    public void setQuestionVisits(Integer questionVisits) {
        this.questionVisits = questionVisits;
    }

    public Integer getTheoryVisits() {
        return theoryVisits;
    }

    public void setTheoryVisits(Integer theoryVisits) {
        this.theoryVisits = theoryVisits;
    }

    public Integer getNotesVisits() {
        return notesVisits;
    }

    public void setNotesVisits(Integer notesVisits) {
        this.notesVisits = notesVisits;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
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

    @NotNull
    private LocalDateTime updatedAt; // Last updated time
}
