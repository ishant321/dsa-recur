package com.dsarecur.dashboard.dto;

public class LeastRevisedQuestionDto {
    private Integer questionId;
    private Integer revisionCount;

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getRevisionCount() {
        return revisionCount;
    }

    public LeastRevisedQuestionDto(Integer questionId, Integer revisionCount) {
        this.questionId = questionId;
        this.revisionCount = revisionCount;
    }

    public LeastRevisedQuestionDto() {
    }

    public void setRevisionCount(Integer revisionCount) {
        this.revisionCount = revisionCount;
    }
}
