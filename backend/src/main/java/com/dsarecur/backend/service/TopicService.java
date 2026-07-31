package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.topic.CreateTopicRequest;
import com.dsarecur.backend.dto.topic.UpdateTopicRequest;
import com.dsarecur.backend.exception.ResourceNotFoundException;
import com.dsarecur.backend.model.Topics;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.repository.TopicRepository;
import com.dsarecur.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dsarecur.backend.exception.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Topics> getAllTopics() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email);
        int userId = user.getId();
        return new ArrayList<>(topicRepository.findByUserId(userId));
    }

    public Topics createTopic(CreateTopicRequest requestTopic) {
        Topics topic = new Topics();
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email);
        int userId = user.getId();

        topic.setName(requestTopic.getName());
        topic.setUserId(userId);
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

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email);
        int userId = user.getId();


        // security check: user must own this topic
        if (!topic.getUserId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to update this topic");
        }

        topic.setName(requestTopic.getName());
        topic.setParentId(requestTopic.getParentId());

        return topicRepository.save(topic);
    }
}
