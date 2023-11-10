package com.crave.backend.service;

import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.repository.CommentRepository;
import com.crave.backend.repository.DishRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final DishRepository dishRepository;

    public List<Comment> getComments(long dishId) {
        return commentRepository.findCommentsByDishId(dishId);
    }

    public Comment createComment(Account account, Long dishId, Comment comment) {
        Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new EntityNotFoundException("Dish with id " + dishId + " not found"));

        comment.setDish(dish);
        comment.setAccount(account);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

}
