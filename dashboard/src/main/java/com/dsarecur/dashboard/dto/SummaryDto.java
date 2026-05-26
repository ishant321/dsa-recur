package com.dsarecur.dashboard.dto;

public class SummaryDto {

    private Integer questionsRevised;

    private Integer totalRevisions;

    private Integer topicsCovered;

    private Integer notesRevised;

    private Integer theoriesRevised;

    private Integer currentStreak;

    private Integer todayRevisionCount;

    private Integer mostRevisedTopicId;

    public SummaryDto() {
    }

    public SummaryDto(Integer questionsRevised,
                      Integer totalRevisions,
                      Integer topicsCovered,
                      Integer notesRevised,
                      Integer theoriesRevised,
                      Integer currentStreak,
                      Integer todayRevisionCount,
                      Integer mostRevisedTopicId) {

        this.questionsRevised = questionsRevised;
        this.totalRevisions = totalRevisions;
        this.topicsCovered = topicsCovered;
        this.notesRevised = notesRevised;
        this.theoriesRevised = theoriesRevised;
        this.currentStreak = currentStreak;
        this.todayRevisionCount = todayRevisionCount;
        this.mostRevisedTopicId = mostRevisedTopicId;
    }

    public Integer getQuestionsRevised() {
        return questionsRevised;
    }

    public void setQuestionsRevised(Integer questionsRevised) {
        this.questionsRevised = questionsRevised;
    }

    public Integer getTotalRevisions() {
        return totalRevisions;
    }

    public void setTotalRevisions(Integer totalRevisions) {
        this.totalRevisions = totalRevisions;
    }

    public Integer getTopicsCovered() {
        return topicsCovered;
    }

    public void setTopicsCovered(Integer topicsCovered) {
        this.topicsCovered = topicsCovered;
    }

    public Integer getNotesRevised() {
        return notesRevised;
    }

    public void setNotesRevised(Integer notesRevised) {
        this.notesRevised = notesRevised;
    }

    public Integer getTheoriesRevised() {
        return theoriesRevised;
    }

    public void setTheoriesRevised(Integer theoriesRevised) {
        this.theoriesRevised = theoriesRevised;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public Integer getTodayRevisionCount() {
        return todayRevisionCount;
    }

    public void setTodayRevisionCount(Integer todayRevisionCount) {
        this.todayRevisionCount = todayRevisionCount;
    }

    public Integer getMostRevisedTopic() {
        return mostRevisedTopicId;
    }

    public void setMostRevisedTopic(Integer mostRevisedTopicId) {
        this.mostRevisedTopicId = mostRevisedTopicId;
    }
}