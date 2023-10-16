package com.crave.backend.unit;

import com.crave.backend.model.Comment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentTest {
    private Comment comment;

    @BeforeEach
    public void setUp() {
        comment = new Comment(1L, 1L, 1L, "Comment title", "Comment description ......");
    }

    @Test
    void testGetters() {
        assertEquals(1L, comment.getId());
        assertEquals(1L, comment.getRestaurant_id());
        assertEquals(1L, comment.getUser_id());
        assertEquals("Comment title", comment.getTitle());
        assertEquals("Comment description ......", comment.getBody());
    }

    @Test
    void testSetters() {
        comment.setId(2L);
        comment.setRestaurant_id(2L);
        comment.setUser_id(2L);
        comment.setTitle("Updated title");
        comment.setBody("Updated comment");

        assertEquals(2L, comment.getId());
        assertEquals(2L, comment.getRestaurant_id());
        assertEquals(2L, comment.getUser_id());
        assertEquals("Updated title", comment.getTitle());
        assertEquals("Updated comment", comment.getBody());
    }
}
