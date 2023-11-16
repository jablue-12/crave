package com.crave.backend.unit;

import com.crave.backend.model.Dish;
import com.crave.backend.repository.DishRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class DishRepositoryTest {
    @Autowired
    private DishRepository dishRepository;

    @BeforeEach
    public void setUp() {
        // Setup dishes
        Dish dish1, dish2, dish3, dish4;

        dish1 = Dish.builder()
                .name("Burger")
                .description("dish1 description")
                .tag("beef")
                .image("dish1-image-url".getBytes())
                .price(9.99f)
                .rating(4.1f)
                .build();

        dish2 = Dish.builder()
                .name("Beef Wellington")
                .description("dish2 description")
                .tag("beef")
                .image("dish2-image-url".getBytes())
                .price(14.99f)
                .rating(4.5f)
                .build();

        dish3 = Dish.builder()
                .name("Burger Steak")
                .description("dish3 description")
                .tag("beef")
                .image("dish3-image-url".getBytes())
                .price(12.99f)
                .rating(4.4f)
                .build();

        dish4 = Dish.builder()
                .name("Chicken Alfredo")
                .description("dish4 description")
                .tag("chicken")
                .image("dish4-image-url".getBytes())
                .price(16.99f)
                .rating(3.5f)
                .build();

        dishRepository.save(dish1);
        dishRepository.save(dish2);
        dishRepository.save(dish3);
        dishRepository.save(dish4);

    }

    @Test
    void testFindDishesWithBeefTag() {
        List<Dish> dishListWithBeefTag = dishRepository.findByTagIn(List.of("beef"));
        assertEquals(3, dishListWithBeefTag.size());

        Dish dish1, dish2, dish3;
        dish1 = dishListWithBeefTag.get(0);
        assertEquals("Burger", dish1.getName());
        assertEquals("dish1 description", dish1.getDescription());
        assertEquals("beef", dish1.getTag());
        assertArrayEquals("dish1-image-url".getBytes(), dish1.getImage());
        assertEquals(9.99f, dish1.getPrice());
        assertEquals(4.1f, dish1.getRating());

        dish2 = dishListWithBeefTag.get(1);
        assertEquals("Beef Wellington", dish2.getName());
        assertEquals("dish2 description", dish2.getDescription());
        assertEquals("beef", dish2.getTag());
        assertArrayEquals("dish2-image-url".getBytes(), dish2.getImage());
        assertEquals(14.99f, dish2.getPrice());
        assertEquals(4.5f, dish2.getRating());

        dish3 = dishListWithBeefTag.get(2);
        assertEquals("Burger Steak", dish3.getName());
        assertEquals("dish3 description", dish3.getDescription());
        assertEquals("beef", dish3.getTag());
        assertArrayEquals("dish3-image-url".getBytes(), dish3.getImage());
        assertEquals(12.99f, dish3.getPrice());
        assertEquals(4.4f, dish3.getRating());
    }

    @Test
    void testFindDishWithChickenTag() {
        List<Dish> dishListWithChickenTag = dishRepository.findByTagIn(List.of("chicken"));
        assertEquals(1, dishListWithChickenTag.size());

        Dish dish = dishListWithChickenTag.get(0);

        assertEquals("Chicken Alfredo", dish.getName());
        assertEquals("dish4 description", dish.getDescription());
        assertEquals("chicken", dish.getTag());
        assertArrayEquals("dish4-image-url".getBytes(), dish.getImage());
        assertEquals(16.99f, dish.getPrice());
        assertEquals(3.5f, dish.getRating());
    }

    @Test
    void testFindDishWithChickenAndBeefTags() {
        List<Dish> dishListWithChickenAndBeefTags = dishRepository.findByTagIn(List.of("chicken", "beef"));
        assertEquals(4, dishListWithChickenAndBeefTags.size());

        Dish dish1, dish2, dish3, dish4;

        dish1 = dishListWithChickenAndBeefTags.get(0);
        assertEquals("Burger", dish1.getName());
        assertEquals("dish1 description", dish1.getDescription());
        assertEquals("beef", dish1.getTag());
        assertArrayEquals("dish1-image-url".getBytes(), dish1.getImage());
        assertEquals(9.99f, dish1.getPrice());
        assertEquals(4.1f, dish1.getRating());

        dish2 = dishListWithChickenAndBeefTags.get(1);
        assertEquals("Beef Wellington", dish2.getName());
        assertEquals("dish2 description", dish2.getDescription());
        assertEquals("beef", dish2.getTag());
        assertArrayEquals("dish2-image-url".getBytes(), dish2.getImage());
        assertEquals(14.99f, dish2.getPrice());
        assertEquals(4.5f, dish2.getRating());

        dish3 = dishListWithChickenAndBeefTags.get(2);
        assertEquals("Burger Steak", dish3.getName());
        assertEquals("dish3 description", dish3.getDescription());
        assertEquals("beef", dish3.getTag());
        assertArrayEquals("dish3-image-url".getBytes(), dish3.getImage());
        assertEquals(12.99f, dish3.getPrice());
        assertEquals(4.4f, dish3.getRating());

        dish4 = dishListWithChickenAndBeefTags.get(3);
        assertEquals("Chicken Alfredo", dish4.getName());
        assertEquals("dish4 description", dish4.getDescription());
        assertEquals("chicken", dish4.getTag());
        assertArrayEquals("dish4-image-url".getBytes(), dish4.getImage());
        assertEquals(16.99f, dish4.getPrice());
        assertEquals(3.5f, dish4.getRating());
    }
}
