package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.dto.question.CreateQuestionRequest;
import com.dsarecur.backend.dto.question.UpdateQuestionRequest;
import com.dsarecur.backend.model.Questions;
import com.dsarecur.backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // 1. CREATE
    @PostMapping("/questions")
    public ResponseEntity<Response<?>> getQuestions(@Valid @RequestBody CreateQuestionRequest questionRequest) {
        Questions question = questionService.createQuestion(questionRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Response<>(question, "Question created successfully"));
    }

    // 2. GET QUESTIONS BY TOPIC ID ("/questions?topic_id=topicId")
    @GetMapping("/questions")
    public ResponseEntity<Response<?>> getQuestions(@RequestParam(name = "topic_id") Integer topicId) {
        List<Questions> questions = questionService.getQuestionsByTopic(topicId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(questions, "Questions fetched for topic id: " + topicId));
    }

    // 3. GET QUESTION BY ID
    @GetMapping("questions/{id}")
    public ResponseEntity<Response<?>> getQuestionById(@PathVariable Integer id) {
        Questions question = questionService.getQuestionById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Response<>(question, "Question fetched successfully"));
    }

    // 4. UPDATE QUESTION
    @PutMapping("/questions")
    public ResponseEntity<Response<?>> updateQuestion(@Valid @RequestBody UpdateQuestionRequest updateQuestionRequest) {
        Questions question = questionService.updateQuestion(updateQuestionRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(question, "Question updated successfully"));
    }

    // 5. DELETE QUESTION
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Response<?>> deleteQuestion(@PathVariable Integer id) {
        Questions question = questionService.deleteQuestionById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(question, "Question deleted successfully"));
    }

    // 6. MARK QUESTION AS REVISITED (VISIT_COUNT++, UPDATE LAST_VISITED)
    @PostMapping("/questions/{id}/visit")
    public ResponseEntity<Response<?>> visitQuestion(@PathVariable Integer id) {
        questionService.visitQuestion(id);
        System.out.println("id" + id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(null, "Question visited successfully"));
    }
}
