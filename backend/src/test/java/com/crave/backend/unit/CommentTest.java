package com.crave.backend.unit;

import com.crave.backend.model.Comment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentTest {
    private Comment comment;

    @BeforeEach
    public void setUp() {
        comment = Comment.builder()
                .id(1L)
                .dish_id(1L)
                .user_id(1L)
                .content("Comment description ......")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, comment.getId());
        assertEquals(1L, comment.getDish_id());
        assertEquals(1L, comment.getUser_id());
        assertEquals("Comment description ......", comment.getContent());
    }

    @Test
    void testSetters() {
        comment.setId(2L);
        comment.setDish_id(2L);
        comment.setUser_id(2L);
        comment.setContent("Updated comment");

        assertEquals(2L, comment.getId());
        assertEquals(2L, comment.getDish_id());
        assertEquals(2L, comment.getUser_id());
        assertEquals("Updated comment", comment.getContent());
    }
}
