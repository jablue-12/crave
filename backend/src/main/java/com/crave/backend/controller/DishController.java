package com.crave.backend.controller;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.CommentService;
import com.crave.backend.service.DishService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping
    public ResponseEntity<Object> createDish(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Dish dish) {
        if (userDetails != null) {
            Account admin = accountService.findByEmail(userDetails.getUsername());

            if (admin.getUserRole() == UserRole.ADMIN) {
                try {
                    Dish newDish = dishService.createDish(dish);
                    return new ResponseEntity<>(newDish, HttpStatus.CREATED);
                } catch (IllegalArgumentException e) {
                    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
                }
            }
        }
        return new ResponseEntity<>("The account that is trying to add a dish is not an admin.", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/{dishId}/image")
    public ResponseEntity<Object> uploadDishImage(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long dishId,
            @RequestParam("image") MultipartFile file) {

        if (userDetails != null) {
            Account admin = accountService.findByEmail(userDetails.getUsername());

            if (admin.getUserRole() == UserRole.ADMIN) {
                try {
                    Dish newDish = dishService.uploadDishImage(dishId, file, getBaseUrl());
                    return new ResponseEntity<>(newDish, HttpStatus.CREATED);
                } catch (Exception e) {
                    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
                }
            }
        }

        return new ResponseEntity<>("The account that is trying to add a dish is not an admin.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/{dishId}/image")
    public ResponseEntity<Object> downloadImage(@PathVariable Long dishId) {

        try {
            byte[] imageData = dishService.downloadImage(dishId);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(imageData);
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("Dish with id " + dishId + " does not exist or the dish does not have an image yet.");
        }
    }

    @GetMapping(path = "/{dishId}/comments")
    public ResponseEntity<Object> getComments(@PathVariable Long dishId) {
        Dish dish = dishService.findDish(dishId);
        if (dish != null) {
            return ok(commentService.getComments(dishId));
        } else {
            return ResponseEntity.badRequest().body("Dish with id " + dishId + " does not exist");
        }
    }

    @PostMapping(path = "/{dishId}/comments")
    public ResponseEntity<Object> createComment(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long dishId, @RequestBody Comment comment) {
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
    public ResponseEntity<Object> updateComment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long dishId,
            @PathVariable Long commentId,
            @RequestBody Comment comment) {
        return new ResponseEntity<>(CommentDTO.of(comment), HttpStatus.CREATED);
    }

    private String getBaseUrl() {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        // Get the base URL
        String baseUrl = request.getRequestURL().toString();
        int lastIndex = baseUrl.lastIndexOf(request.getRequestURI());
        baseUrl = baseUrl.substring(0, lastIndex);

        return baseUrl;
    }
}

