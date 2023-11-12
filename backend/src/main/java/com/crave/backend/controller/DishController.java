package com.crave.backend.controller;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.CommentService;
import com.crave.backend.service.DishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/dishes")
@RequiredArgsConstructor
public class DishController {
    private final DishService dishService;
    private final CommentService commentService;
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Dish>> getDishes(@RequestParam(value = "tags", required = false) List<String> tags) {
        return (tags == null || tags.isEmpty()) ? ok(dishService.getDishes()) : ok(dishService.getByTags(tags));
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> createDish(@RequestBody Dish dish) {
        try {
            Dish newDish = dishService.createDish(dish);
            return new ResponseEntity<>(newDish, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/{dishId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long dishId) {
        Dish dish = dishService.findDish(dishId);
        if (dish != null) {
            return ok(commentService.getComments(dishId));
        } else {
            return ResponseEntity.badRequest().body("Dish with id " + dishId + " does not exist");
        }
    }

    @PostMapping(path = "/{dishId}/comments")
    public ResponseEntity<?> createComment(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long dishId, @RequestBody Comment comment) {
        if (userDetails != null) {
            try {
                Account user = accountService.findByEmail(userDetails.getUsername());
                Comment newComment = commentService.createComment(user, dishId, comment);

                return new ResponseEntity<>(CommentDTO.of(newComment), HttpStatus.CREATED);

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User has to be authenticated in order to make a comment.");
    }

    @PutMapping(path = "/{dishId}/comments/{commentId}")
    public ResponseEntity<?> updateComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long dishId,
            @PathVariable Long commentId,
            @RequestBody Comment comment) {
        System.out.println(dishId);
        System.out.println(commentId);
        System.out.println(comment);
        return new ResponseEntity<>(CommentDTO.of(comment), HttpStatus.CREATED);
    }
}

