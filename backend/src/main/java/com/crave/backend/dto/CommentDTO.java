package com.crave.backend.dto;

import com.crave.backend.model.Comment;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentDTO(Long id, String content, LocalDateTime createdAt, String fullName) {
    public static CommentDTO of(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .fullName(comment.getAccount().getFirstName() + " " + comment.getAccount().getLastName())
                .build();
    }
}
