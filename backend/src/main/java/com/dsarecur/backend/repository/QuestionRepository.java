package com.dsarecur.backend.repository;

import com.dsarecur.backend.model.Questions;
import com.dsarecur.backend.model.Theory;
import com.dsarecur.backend.model.Topics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Integer> {
    List<Questions> findByTopicId(Integer topicId);
    List<Questions> findByUserId(int userId);

    @Query(value = """
    SELECT *
    FROM questions
    WHERE user_id = :userId
    ORDER BY RANDOM()
    LIMIT 1
    """, nativeQuery = true)
    Questions getRandomQuestionByUserId(@Param("userId") int userId);
}
