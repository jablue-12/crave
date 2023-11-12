package com.crave.backend.service;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.repository.CommentRepository;
import com.crave.backend.repository.DishRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final DishRepository dishRepository;

    public List<CommentDTO> getComments(Long dishId) {

        List<CommentDTO> commentDTO = new ArrayList<>();
        List<Comment> comments = commentRepository.findCommentsByDishId(dishId);

        for (Comment comment : comments) {
            commentDTO.add(CommentDTO.of(comment));
        }

        return commentDTO;
    }

    public Comment createComment(Account account, Long dishId, Comment comment) {
        Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new EntityNotFoundException("Dish with id " + dishId + " not found"));

        if (comment.getContent().equals("")) {
            throw new IllegalArgumentException("Content should not be empty");
        }

        comment.setDish(dish);
        comment.setAccount(account);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

}
