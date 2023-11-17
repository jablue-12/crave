package com.crave.backend.integration;

import com.crave.backend.model.Dish;
import com.crave.backend.repository.DishRepository;
import com.crave.backend.service.DishService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application.properties")
public class DishServiceTest {
    @Autowired
    private DishService dishService;
    @Autowired
    private DishRepository dishRepository;

    @Test
    public void testGetDishes() {
        List<Dish> dishes = dishService.getDishes();
        assertEquals(0, dishes.size());
    }

    @Test
    public void testCreateDish() {
        Dish dish = Dish.builder()
                .name("Dish 1")
                .description("Description for Dish 1")
                .tag("Tag")
                .price(12.99f)
                .rating(3.5f)
                .ingredientIds(new ArrayList<>())
                .build();

        Dish createdDish = dishService.createDish(dish);

        assertEquals(dish.getName(), createdDish.getName());
        assertEquals(dish.getDescription(), createdDish.getDescription());
        assertEquals(dish.getTag(), createdDish.getTag());
        assertEquals(dish.getPrice(), createdDish.getPrice());
        assertEquals(dish.getRating(), createdDish.getRating());

        List<Dish> dishes = dishService.getDishes();
        assertEquals(1, dishes.size());

        dishRepository.delete(createdDish);
    }
}
