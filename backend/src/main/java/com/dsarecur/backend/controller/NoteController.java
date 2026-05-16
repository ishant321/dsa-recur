package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.dto.note.CreateNoteRequest;
import com.dsarecur.backend.dto.note.UpdateNoteRequest;
import com.dsarecur.backend.model.Notes;
import com.dsarecur.backend.model.Questions;
import com.dsarecur.backend.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {

    @Autowired
    private NoteService noteService;

    // 1. CREATE NOTE
    @PostMapping("/notes")
    public ResponseEntity<Response<?>> createNote(@Valid @RequestBody CreateNoteRequest requestNote) {
        Notes note = noteService.createNote(requestNote);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(note, "Note created successfully"));
    }

    // 2. GET NOTES BY QUESTION ID
    @GetMapping("/notes")
    public ResponseEntity<Response<?>> getNotesByQuestion(@RequestParam(name = "question_id") Integer questionId) {
        List<Notes> notes = noteService.getNotesByQuestionId(questionId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(notes, "Notes found successfully"));
    }

    // 3. UPDATE NOTE
    @PutMapping("/notes")
    public ResponseEntity<Response<?>> updateNote(@Valid @RequestBody UpdateNoteRequest requestNote) {
        Notes note = noteService.updateNote(requestNote);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(note, "Note updated successfully"));
    }

    // 4. DELETE NOTE
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Response<?>> deleteNote(@PathVariable Integer id) {
        Notes note = noteService.deleteNoteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(note, "Note deleted successfully"));
    }
}
