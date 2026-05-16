package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.theory.CreateTheoryRequest;
import com.dsarecur.backend.dto.theory.UpdateTheoryRequest;
import com.dsarecur.backend.exception.ResourceNotFoundException;
import com.dsarecur.backend.model.Theory;
import com.dsarecur.backend.repository.TheoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TheoryService {

    @Autowired
    private TheoryRepository theoryRepository;

    public Theory createTheory(CreateTheoryRequest theoryRequest) {
        Theory theory = new Theory();
        theory.setContent(theoryRequest.getContent());
        theory.setTitle(theoryRequest.getTitle());
        theory.setTopicId(theoryRequest.getTopicId());
        theory.setCreatedAt(LocalDateTime.now());

        return theoryRepository.save(theory);
    }

    public List<Theory> getAllTheory() {
        return theoryRepository.findAll();
    }

    public Theory getTheoryById(Integer id) {
        return theoryRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Theory not found with id: " + id));
    }

    public Theory deleteTheoryById(Integer id) {
        Theory theory = theoryRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Theory not found with id: " + id));
        theoryRepository.delete(theory);
        return theory;
    }

    public Theory updateTheory(@Valid UpdateTheoryRequest theoryRequest) {
        theoryRepository
                .findById(theoryRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Theory id not found"));

        Theory theory = theoryRepository.findById(theoryRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Theory id not found"));
        theory.setContent(theoryRequest.getContent());
        theory.setTopicId(theoryRequest.getTopicId());
        theory.setTitle(theoryRequest.getTitle());

        theoryRepository.save(theory);
        return theory;
    }

    public Theory getRandomTheory() {
        return theoryRepository.getRandomTheory();
    }
}
