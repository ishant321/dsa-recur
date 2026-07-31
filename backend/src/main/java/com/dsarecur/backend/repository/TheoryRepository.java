package com.dsarecur.backend.repository;

import com.dsarecur.backend.model.Theory;
import com.dsarecur.backend.model.Topics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TheoryRepository extends JpaRepository<Theory, Integer> {
    @Query(value = """
    SELECT *
    FROM theory
    WHERE user_id = :userId
    ORDER BY RANDOM()
    LIMIT 1
    """, nativeQuery = true)
    Theory getRandomTheoryByUserId(@Param("userId") int userId);
    List<Theory> findByUserId(int userId);
}
