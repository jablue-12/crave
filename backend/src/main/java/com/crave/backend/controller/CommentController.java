package com.crave.backend.controller;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.CommentService;
import com.crave.backend.service.DishService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final AccountService accountService;
    private final DishService dishService;

    @GetMapping(path = "/{dishId}")
    public ResponseEntity<?> getComments(@PathVariable Long dishId) {
        Dish dish = dishService.findDish(dishId);
        if (dish != null) {
            return ok(commentService.getComments(dishId));
        } else {
            return ResponseEntity.badRequest().body("Dish with id " + dishId + " does not exist");
        }
    }

    @PostMapping(path = "/create/{dishId}")
    public ResponseEntity<?> createCommentOnDishId(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long dishId, @RequestBody Comment comment) {
        if (userDetails != null) {
            try {
                Account user = accountService.findByEmail(userDetails.getUsername());
                Comment newComment = commentService.createComment(user, dishId, comment);
                CommentDTO commentDTO = CommentDTO.of(newComment);

                return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User has to be authenticated in order to make a comment.");

    }
}
