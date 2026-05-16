package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.question.CreateQuestionRequest;
import com.dsarecur.backend.dto.question.UpdateQuestionRequest;
import com.dsarecur.backend.exception.ResourceNotFoundException;
import com.dsarecur.backend.model.Questions;
import com.dsarecur.backend.repository.QuestionRepository;
import com.dsarecur.backend.repository.TopicRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TopicRepository topicRepository;

    public Questions createQuestion(CreateQuestionRequest questionRequest) {
        Questions question = new Questions();

        question.setTitle(questionRequest.getTitle());
        question.setLink(questionRequest.getLink());
        question.setDifficulty(questionRequest.getDifficulty());

        topicRepository.findById(questionRequest.getTopicId())
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
        question.setTopicId(questionRequest.getTopicId());

        question.setVisitedCount(0);
        question.setCreatedAt(LocalDateTime.now());
        question.setLastVisitedAt(LocalDateTime.now());

        return questionRepository.save(question);
    }

    public List<Questions> getQuestionsByTopic(Integer topicId) {
        topicRepository.findById(topicId).orElseThrow(()
                -> new ResourceNotFoundException("Topic not found"));
        return questionRepository.findByTopicId(topicId);
    }

    public Questions getQuestionById(Integer id) {
        return questionRepository
                            .findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
    }

    public Questions updateQuestion(@Valid UpdateQuestionRequest updateQuestionRequest) {
        Questions question = questionRepository.findById(updateQuestionRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        question.setTitle(updateQuestionRequest.getTitle());
        question.setDifficulty(updateQuestionRequest.getDifficulty());
        question.setLink(updateQuestionRequest.getLink());

        topicRepository.findById(updateQuestionRequest.getTopicId())
                        .orElseThrow(()  -> new ResourceNotFoundException("Topic not found"));
        question.setTopicId(updateQuestionRequest.getTopicId());

        questionRepository.save(question);
        return question;
    }

    public Questions deleteQuestionById(Integer id) {
        Questions question =  questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        questionRepository.delete(question);
        return question;
    }

    public void visitQuestion(Integer id) {
        Questions question =  questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        question.setVisitedCount(question.getVisitedCount() + 1);
        question.setLastVisitedAt(LocalDateTime.now());

        questionRepository.save(question);
    }
}
