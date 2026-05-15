package com.dsarecur.backend.service;

import com.dsarecur.backend.model.Topics;
import com.dsarecur.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public List<Topics> getAllTopics() {
        System.out.println("Getting all topics");
        return new ArrayList<>(topicRepository.findAll());
    }

    public void createTopic(Topics topic) {
        topic.setCreatedAt(LocalDateTime.now());
        topicRepository.save(topic);
    }

    public void deleteTopic(Topics topic) {
        topicRepository.deleteById(topic.getId());
    }

    public void updateTopic(Topics topic) {
        topic.setCreatedAt(LocalDateTime.now());
        topicRepository.save(topic);
    }
}
