package com.crave.backend.integration;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.AuthenticationService;
import com.crave.backend.service.CommentService;
import com.crave.backend.service.DishService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
public class CommentServiceTest {
    @Autowired
    private DishService dishService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private CommentService commentService;
    private Dish createdDish;

    @BeforeEach
    public void setUp() {
        Dish dish = Dish.builder()
                .name("Dish 1")
                .description("Description for Dish 1")
                .tag("Tag")
                .price(12.99f)
                .rating(3.5f)
                .ingredientIds(new ArrayList<>())
                .build();

        createdDish = dishService.createDish(dish);
    }

    @Test
    public void testGetComments() {
        List<CommentDTO> comments = commentService.getComments(createdDish.getId());
        assertEquals(0, comments.size());
    }

    @Test
    @Disabled
    public void testCreateComment() {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .firstName("Dushane")
                .lastName("Hill")
                .email("dhill@gmail.co.uk")
                .password("idkruhfaminnit")
                .userRole(UserRole.USER)
                .build();

        authenticationService.register(registerRequest);

        Comment newComment = Comment.builder()
                .content("Comment description")
                .build();

        Account user = accountService.findByEmail("dhill@gmail.co.uk");

        Comment createdComment = commentService.createComment(user, createdDish.getId(), newComment);

        assertEquals(user, createdComment.getAccount());
        assertEquals(createdDish.getName(), createdComment.getDish().getName());
        assertEquals("Comment description", createdComment.getContent());

        List<CommentDTO> comments = commentService.getComments(createdDish.getId());
        assertEquals(1, comments.size());
    }
}
