package com.crave.backend.controller;

import com.crave.backend.model.Comment;
import com.crave.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping(path = "comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getComments() {
        return commentService.getComments();
    }

    @GetMapping(path = "/{id}")
    public Optional<Comment> getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment newComment = commentService.createComment(comment);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        Comment existingComment = commentService.findById(id);

        if (existingComment == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Comment updated = commentService.updateComment(existingComment, updatedComment);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        if (!commentService.exists(id)) {
            return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
        }

        commentService.deleteCommentById(id);
        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.NO_CONTENT);
    }

}
