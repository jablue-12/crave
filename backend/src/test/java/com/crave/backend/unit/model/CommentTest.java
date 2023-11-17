package com.crave.backend.unit.model;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class CommentTest {
    private Comment comment;
    private Dish dish;
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

        dish = Dish.builder()
                .id(1l)
                .name("Burger")
                .description("Burger description")
                .tag("beef")
                .image("some-image-url".getBytes())
                .price(14.99f)
                .ingredientIds(new ArrayList<>())
                .build();

        comment = Comment.builder()
                .id(1L)
                .content("Comment description ......")
                .createdAt(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30))
                .dish(dish)
                .account(user)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, comment.getId());
        assertEquals("Comment description ......", comment.getContent());
        assertEquals(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30), comment.getCreatedAt());

        // Dish
        assertEquals(1l, comment.getDish().getId());
        assertEquals("Burger", comment.getDish().getName());
        //Account
        assertEquals(1l, comment.getAccount().getId());
        assertEquals("dhill@gmail.co.uk", comment.getAccount().getEmail());
    }

    @Test
    void testSetters() {
        comment.setId(2L);
        comment.setContent("Updated comment");
        comment.setCreatedAt(LocalDateTime.of(2023, Month.DECEMBER, 24, 23, 59));
        comment.setDish(null);
        comment.setAccount(null);

        assertEquals(2L, comment.getId());
        assertEquals("Updated comment", comment.getContent());
        assertEquals(LocalDateTime.of(2023, Month.DECEMBER, 24, 23, 59), comment.getCreatedAt());

        // Dish
        assertNull(comment.getDish());
        //Account
        assertNull(comment.getAccount());
    }
}
