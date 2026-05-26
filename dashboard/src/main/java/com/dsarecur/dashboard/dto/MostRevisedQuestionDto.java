package com.dsarecur.dashboard.dto;

public class MostRevisedQuestionDto {

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

    public MostRevisedQuestionDto(Integer questionId, Integer revisionCount) {
        this.questionId = questionId;
        this.revisionCount = revisionCount;
    }

    public MostRevisedQuestionDto() {
    }

    public void setRevisionCount(Integer revisionCount) {
        this.revisionCount = revisionCount;
    }
}
