package com.dsarecur.backend.repository;

import com.dsarecur.backend.model.Theory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TheoryRepository extends JpaRepository<Theory, Integer> {
    @Query(value = "SELECT * FROM theory ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Theory getRandomTheory();
}
