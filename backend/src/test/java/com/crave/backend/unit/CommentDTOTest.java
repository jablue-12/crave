package com.crave.backend.unit;

import com.crave.backend.dto.CommentDTO;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.Month;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentDTOTest {

    private Comment comment;
    private CommentDTO commentDTO;
    private Account user;

    @BeforeEach
    public void setUp() {
        user = Account.builder()
                .id(1l)
                .firstName("Dushane")
                .lastName("Hill")
                .email("dhill@gmail.co.uk")
                .password("idkruhfaminnit")
                .userRole(UserRole.USER)
                .build();

        comment = Comment.builder()
                .id(1L)
                .content("Comment description ......")
                .createdAt(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30))
                .dish(null)
                .account(user)
                .build();

        commentDTO = CommentDTO.of(comment);
    }

    @Test
    void testGetters() {
        assertEquals(1L, commentDTO.id());
        assertEquals("Comment description ......", commentDTO.content());
        assertEquals(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30), commentDTO.createdAt());
        assertEquals("dhill@gmail.co.uk", commentDTO.email());
    }

}
