package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.model.Topics;
import com.dsarecur.backend.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TopicController {

    @Autowired
    private TopicService topicService;

    // 1. CREATE TOPIC
    @PostMapping("/topics")
    public Response<?> createTopic(@RequestBody Topics topic) {
        topicService.createTopic(topic);
        return new Response<>(null, "Topic created successfully", HttpStatus.CREATED);
    }


    // 2. FETCH ALL TOPICS
    @GetMapping("/topics")
    public Response<List<Topics>> getAllTopics() {
        List<Topics> allTopics = topicService.getAllTopics();
        return new Response<>(allTopics, "All topics fetched", HttpStatus.OK);
    }


    // 3. UPDATE TOPIC
    @PutMapping("/topics")
    public Response<?> updateTopic(@RequestBody Topics topic) {
        topicService.updateTopic(topic);
        return new Response<>(null, "Topic updated successfully", HttpStatus.OK);
    }


    // 4. DELETE TOPIC
    @DeleteMapping("/topics")
    public Response<?> deleteTopic(@RequestBody Topics topic) {
        topicService.deleteTopic(topic);
        return new Response<>(null, "Topic deleted successfully", HttpStatus.OK);
    }

}
