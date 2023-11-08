package com.crave.backend.controller;

import com.crave.backend.model.Comment;
import com.crave.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("dishes")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{dishId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long dishId) {
        return ok(commentService.getComments(dishId));
    }

    @PostMapping("/{dishId}/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment newComment = commentService.createComment(comment);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);

    }
}
