package com.dsarecur.dashboard.controller;

import com.dsarecur.dashboard.dto.*;
import com.dsarecur.dashboard.service.UserActivityDailyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class Dashboard {

    @Autowired
    private UserActivityDailyService userActivityDailyService;

    // 1. GET DASHBOARD SUMMARY
    @GetMapping("/summary")
    public ResponseEntity<Response<SummaryDto>> summary() {
        SummaryDto summary = userActivityDailyService.getSummary();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(summary, "Summary fetched successfully"));
    }

    // 2. GET WEAK TOPICS
    @GetMapping("/weak_topics")
    public ResponseEntity<Response<List<WeakTopicDto>>> weakTopics() {
        List<WeakTopicDto> weakTopics = userActivityDailyService.getWeakTopics();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(weakTopics, "Weak topics fetched successfully"));
    }

    // 3. GET MOST REVISED QUESTIONS
    @GetMapping("/most_revised_questions")
    public ResponseEntity<Response<List<MostRevisedQuestionDto>>> mostRevisedQuestions() {
        List<MostRevisedQuestionDto> mostRevisedQuestions = userActivityDailyService.getMostRevisedQuestions();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(mostRevisedQuestions, "Most revised questions fetched successfully"));
    }

    // 4. GET LEAST VISITED QUESTIONS
    @GetMapping("/least_revised_questions")
    public ResponseEntity<Response<List<LeastRevisedQuestionDto>>> leastRevisedQuestions() {
        List<LeastRevisedQuestionDto> leastRevisedQuestions = userActivityDailyService.getLeastRevisedQuestions();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(leastRevisedQuestions, "Least revised questions fetched successfully"));
    }

    // 5. GET ACTIVITY OVER TIME(for now: will return the revision count for today)
    @GetMapping("/activity")
    public ResponseEntity<Response<?>> getActivity() {
        Integer revisionCnt = userActivityDailyService.getActivity();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(revisionCnt, "Activity fetched successfully"));
    }

}

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzQGdtYWlsLmNvbSIsImlhdCI6MTc3OTIxMTU4MiwiZXhwIjoxNzc5MzE5NTgyfQ.FiuWzZJ1Qki6XYXfjzvN7bqkdKaqs3P57vIeHvidEW4