package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.dto.theory.CreateTheoryRequest;
import com.dsarecur.backend.dto.theory.UpdateTheoryRequest;
import com.dsarecur.backend.model.Theory;
import com.dsarecur.backend.service.TheoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TheoryController {

    @Autowired
    TheoryService theoryService;

    // 1. CREATE
    @PostMapping("/theory")
    public ResponseEntity<Response<?>> createTheory(@Valid @RequestBody CreateTheoryRequest theoryRequest) {
        Theory theory = theoryService.createTheory(theoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(theory, "Theory created successfully"));
    }

    // 2. GET ALL THEORY
    @GetMapping("/theory/all")
    public ResponseEntity<Response<?>> getAllTheory() {
        List<Theory> allTheory = theoryService.getAllTheory();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(allTheory, "All Theory retrieved successfully"));
    }

    // 3. GET THEORY BY ID
    @GetMapping("/theory/{id}")
    public ResponseEntity<Response<?>> getTheoryById(@PathVariable Integer id) {
        Theory theory = theoryService.getTheoryById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Response<>(theory, "Theory fetched successfully"));
    }

    // 4. UPDATE THEORY
    @PutMapping("/theory")
    public ResponseEntity<Response<?>> updateTheory(@Valid @RequestBody UpdateTheoryRequest theoryRequest) {
        Theory theory = theoryService.updateTheory(theoryRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(theory, "Theory updated successfully"));
    }

    // 5. DELETE THEORY
    @DeleteMapping("/theory/{id}")
    public ResponseEntity<Response<?>> deleteTheory(@PathVariable Integer id) {
        Theory theory = theoryService.deleteTheoryById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(theory, "Theory deleted successfully"));
    }

    // 6. GET RANDOM THEORY
    @GetMapping("/theory/random")
    public ResponseEntity<Response<?>> getRandomTheory() {

        Theory theory = theoryService.getRandomTheory();

        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(
                        theory,
                        "Random theory fetched successfully"
                ));
    }
}
