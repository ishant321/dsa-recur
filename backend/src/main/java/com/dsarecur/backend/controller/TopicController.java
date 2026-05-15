package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.topic.CreateTopicRequest;
import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.dto.topic.UpdateTopicRequest;
import com.dsarecur.backend.model.Topics;
import com.dsarecur.backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TopicController {

    @Autowired
    private TopicService topicService;

    // 1. CREATE TOPIC
    @PostMapping("/topics")
    public ResponseEntity<Response<?>> createTopic(@Valid @RequestBody CreateTopicRequest requestTopic) {
        Topics topic = topicService.createTopic(requestTopic);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(topic, "Topic created successfully"));
    }

    // 2. FETCH ALL TOPICS
    @GetMapping("/topics")
    public ResponseEntity<Response<List<Topics>>> getAllTopics() {
        List<Topics> allTopics = topicService.getAllTopics();
        return ResponseEntity.status(HttpStatus.OK).body(new Response<>(allTopics, "All topics fetched"));
    }


    // 3. UPDATE TOPIC
    @PutMapping("/topics")
    public ResponseEntity<Response<?>> updateTopic(@Valid @RequestBody UpdateTopicRequest requestTopic) {
        Topics topic = topicService.updateTopic(requestTopic);
        return ResponseEntity.status(HttpStatus.OK).body(new Response<>(topic, "Topic updated successfully"));
    }


    // 4. DELETE TOPIC
    @DeleteMapping("/topics/{id}")
    public ResponseEntity<Response<?>> deleteTopic(@PathVariable Integer id) {
        Topics topic = topicService.deleteTopic(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(topic, "Topic deleted successfully"));
    }

}
