package com.crave.backend.unit;

import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DishTest {
    private List<Long> ingredientIds;
    private Dish dish;

    @BeforeEach
    public void setUp() {
        ingredientIds = new ArrayList<>();
        Ingredient ingredient;

        ingredient = Ingredient.builder()
                .id(100l)
                .name("beef")
                .tag("beef")
                .quantity(2)
                .build();
        ingredientIds.add(ingredient.getId());

        ingredient = Ingredient.builder()
                .id(101l)
                .name("garlic")
                .tag("garlic")
                .quantity(3)
                .build();

        ingredientIds.add(ingredient.getId());

        dish = Dish.builder()
                .id(1l)
                .name("Burger")
                .description("Burger description")
                .tag("beef")
                .imageUrl("some-image-url")
                .price(14.99f)
                .ingredientIds(ingredientIds)
                .build();

    }

    @Test
    void testGetters() {
        assertEquals(1L, dish.getId());
        assertEquals("Burger", dish.getName());
        assertEquals("Burger description", dish.getDescription());
        assertEquals("beef", dish.getTag());
        assertEquals("some-image-url", dish.getImageUrl());
        assertEquals(14.99f, dish.getPrice());

        // Ingredients
        List<Long> actualList = dish.getIngredientIds();
        assertEquals(100l, actualList.get(0));

        assertEquals(101l, actualList.get(1));
    }

    @Test
    void testSetters() {
        dish.setId(2L);
        dish.setName("Chicken Alfredo");
        dish.setDescription("Chicken Alfredo description");
        dish.setTag("chicken");
        dish.setImageUrl("some-image-url-updated");
        dish.setPrice(14.99f);
        dish.setIngredientIds(new ArrayList<>());

        assertEquals(2L, dish.getId());
        assertEquals("Chicken Alfredo", dish.getName());
        assertEquals("Chicken Alfredo description", dish.getDescription());
        assertEquals("chicken", dish.getTag());
        assertEquals("some-image-url-updated", dish.getImageUrl());
        assertEquals(14.99f, dish.getPrice());

        assertEquals(0, dish.getIngredientIds().size());
    }
}
