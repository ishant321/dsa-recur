package com.dsarecur.backend.repository;

import com.dsarecur.backend.model.Topics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topics, Integer> {
}
