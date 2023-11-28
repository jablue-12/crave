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
@TestPropertySource(locations = "classpath:test-application.properties")
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

    @Test
    public void testGetByTags() {
        Dish dish1, dish2;

        dish1 = Dish.builder()
                .tag("Pizza")
                .build();

        dish2 = Dish.builder()
                .tag("Burgers")
                .build();

        dishRepository.save(dish1);
        dishRepository.save(dish2);

        List<Dish> dishWithPizzaTag = dishService.getByTags(List.of("Pizza"));
        List<Dish> dishWithBurgersTag = dishService.getByTags(List.of("Burgers"));
        List<Dish> dishWithAllTags = dishService.getByTags(List.of("Pizza", "Burgers"));
        List<Dish> dishWithNoTags = dishService.getByTags(new ArrayList<>());

        assertEquals(1, dishWithPizzaTag.size());
        assertEquals(1, dishWithBurgersTag.size());
        assertEquals(2, dishWithAllTags.size());
        assertEquals(0, dishWithNoTags.size());
    }
}
