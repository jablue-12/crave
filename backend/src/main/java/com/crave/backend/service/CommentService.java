package com.crave.backend.service;

import com.crave.backend.model.Comment;
import com.crave.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getComments(long dishId) {
        return commentRepository.findAll().stream()
                .filter(x -> x.getDish_id() == dishId)
                .toList();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment existingComment, Comment updatedComment) {

        if (existingComment != null) {
            existingComment.setContent(updatedComment.getContent());
            commentRepository.save(existingComment);
        }

        return existingComment;
    }

    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment findById(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        return comment.orElse(null);
    }

    public boolean exists(Long id) {
        return commentRepository.findById(id).isPresent();
    }
}
