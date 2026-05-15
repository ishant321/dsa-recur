package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.topic.CreateTopicRequest;
import com.dsarecur.backend.dto.topic.UpdateTopicRequest;
import com.dsarecur.backend.exception.ResourceNotFoundException;
import com.dsarecur.backend.model.Topics;
import com.dsarecur.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsarecur.backend.exception.AccessDeniedException;
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

    public Topics createTopic(CreateTopicRequest requestTopic) {
        Topics topic = new Topics();

        topic.setName(requestTopic.getName());
        topic.setUserId(requestTopic.getUserId());
        topic.setCreatedAt(LocalDateTime.now());
        topic.setParentId(requestTopic.getParentId());

        return topicRepository.save(topic);
    }

    public Topics deleteTopic(Integer id) {
        Topics topic = topicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
        topicRepository.delete(topic);
        return topic;
    }

    public Topics updateTopic(UpdateTopicRequest requestTopic) {
        Topics topic = topicRepository.findById(requestTopic.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));

        // security check: user must own this topic
        if (!topic.getUserId().equals(requestTopic.getUserId())) {
            throw new AccessDeniedException("You are not allowed to update this topic");
        }

        topic.setName(requestTopic.getName());
        topic.setParentId(requestTopic.getParentId());

        return topicRepository.save(topic);
    }
}
