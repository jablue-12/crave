package com.crave.backend.dto;

import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentDTO(Long id, String content, LocalDateTime createdAt, Dish dish, UserDTO user) {
    public static CommentDTO of(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .dish(comment.getDish())
                .user(UserDTO.of(comment.getAccount()))
                .build();
    }
}
