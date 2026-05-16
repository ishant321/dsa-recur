package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.note.CreateNoteRequest;
import com.dsarecur.backend.dto.note.UpdateNoteRequest;
import com.dsarecur.backend.exception.ResourceNotFoundException;
import com.dsarecur.backend.model.Notes;
import com.dsarecur.backend.repository.NoteRepository;
import com.dsarecur.backend.repository.QuestionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Notes createNote(CreateNoteRequest requestNote) {
        Notes note = new Notes();

        questionRepository
                .findById(requestNote.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question id not found"));
        note.setQuestionId(requestNote.getQuestionId());
        note.setContent(requestNote.getContent());
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());

        noteRepository.save(note);
        return note;
    }

    public List<Notes> getNotesByQuestionId(Integer questionId) {
        questionRepository.findById(questionId).
                orElseThrow(() -> new ResourceNotFoundException("Question id not found"));

        return noteRepository.findByQuestionId(questionId);
    }

    public Notes updateNote(@Valid UpdateNoteRequest requestNote) {
        questionRepository
                .findById(requestNote.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question id not found"));

        Notes note = noteRepository.findById(requestNote.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Note id not found"));
        note.setContent(requestNote.getContent());
        note.setQuestionId(requestNote.getQuestionId());
        note.setUpdatedAt(LocalDateTime.now());

        noteRepository.save(note);
        return note;
    }

    public Notes deleteNoteById(Integer id) {
        Notes note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note id not found"));
        noteRepository.delete(note);
        return note;
    }
}
