package com.crave.backend.unit;

import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.repository.CommentRepository;
import com.crave.backend.repository.DishRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class CommentRepositoryTest {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private DishRepository dishRepository;

    @BeforeEach
    public void setUp() {
        // Setup dish
        Dish dish = Dish.builder()
                .name("Burger")
                .description("Burger description")
                .tag("beef")
                .image("some-image-url".getBytes())
                .price(14.99f)
                .rating(4.5f)
                .build();

        dishRepository.save(dish);

        // Setup comments
        Comment comment1, comment2;
        comment1 = Comment.builder()
                .content("Comment 1 description ......")
                .createdAt(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30))
                .dish(dish)
                .build();

        comment2 = Comment.builder()
                .content("Comment 2 description ......")
                .createdAt(LocalDateTime.of(2023, Month.NOVEMBER, 10, 15, 25))
                .dish(dish)
                .build();

        commentRepository.save(comment1);
        commentRepository.save(comment2);
    }

    @Test
    void testFindCommentsByDishIdThatExists() {

        List<Dish> dishList = dishRepository.findAll();
        assertEquals(1, dishList.size());
        Dish actualDish = dishList.get(0);

        List<Comment> commentList = commentRepository.findCommentsByDishId(actualDish.getId());
        assertEquals(2, commentList.size());

        Comment actualComment1 = commentList.get(0);
        assertEquals("Comment 1 description ......", actualComment1.getContent());
        assertEquals(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30), actualComment1.getCreatedAt());
        assertEquals("Burger", actualComment1.getDish().getName());

        Comment actualComment2 = commentList.get(1);
        assertEquals("Comment 2 description ......", actualComment2.getContent());
        assertEquals(LocalDateTime.of(2023, Month.NOVEMBER, 10, 15, 25), actualComment2.getCreatedAt());
        assertEquals("Burger", actualComment2.getDish().getName());
    }

    @Test
    void testFindCommentsByDishIdThatDoesNotExist() {
        List<Comment> commentList = commentRepository.findCommentsByDishId(101L);
        assertEquals(0, commentList.size());
    }

}
