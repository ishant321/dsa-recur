package com.dsarecur.backend.repository;

import com.dsarecur.backend.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Integer> {
    List<Questions> findByTopicId(Integer topicId);
}
