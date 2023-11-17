package com.crave.backend.unit.service;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.service.CommentService;
import com.crave.backend.service.UserOrderService;
import com.crave.backend.repository.CommentRepository;
import com.crave.backend.repository.DishRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private DishRepository dishRepository;

    @InjectMocks
    private CommentService commentService;

    @Test
    void testGetComments() {
        Long dishId = 1L;
        // Create a list of comments for testing
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment(1L, "Great dish!", LocalDateTime.now(), new Dish(), new Account()));
        comments.add(new Comment(2L, "Delicious! ", LocalDateTime.now(), new Dish(), new Account()));

        // Mock the behavior of the repository findCommentsByDishId method
        when(commentRepository.findCommentsByDishId(dishId)).thenReturn(comments);

        // Call the service method
        List<CommentDTO> retrievedComments = commentService.getComments(dishId);

        // Assertions
        assertEquals(2, retrievedComments.size());
        assertEquals(comments.get(0).getContent(), retrievedComments.get(0).content());
        assertEquals(comments.get(1).getContent(), retrievedComments.get(1).content());
    }

    @Test
    void testCreateComment() {
        Long dishId = 1L;

        // Create an account
        Account account = new Account();

        // Create a dish
        Dish dish = new Dish();

        // Create a comment to be created
        Comment commentToCreate = new Comment(1L, "Great dish!", LocalDateTime.now(), dish, account);

        // Mock the behavior of the repository findById method for Dish
        when(dishRepository.findById(dishId)).thenReturn(Optional.of(dish));

        // Mock the behavior of the repository save method
        when(commentRepository.save(commentToCreate)).thenReturn(commentToCreate);

        // Call the service method
        Comment createdComment = commentService.createComment(account, dishId, commentToCreate);

        // Assertions
        assertEquals(commentToCreate.getContent(), createdComment.getContent());
        assertEquals(commentToCreate.getDish(), createdComment.getDish());
        assertEquals(commentToCreate.getAccount(), createdComment.getAccount());
    }

    @Test
    void testCreateCommentWithEmptyContent() {
        Long dishId = 1L;

        // Create an account
        Account account = new Account();

        // Create a Dish
        Dish dish = new Dish();
        // Create an empty comment to be created
        Comment commentToCreate = new Comment(null, "", LocalDateTime.now(), dish, account);

        // Mock the behavior of the repository findById method for Dish
        when(dishRepository.findById(dishId)).thenReturn(Optional.of(dish));

        // Assertions
        assertThrows(IllegalArgumentException.class, () -> commentService.createComment(account, dishId, commentToCreate));
    }
}