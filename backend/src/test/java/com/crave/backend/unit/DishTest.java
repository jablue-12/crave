package com.crave.backend.unit;

import com.crave.backend.model.Comment;
import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DishTest {
    private Dish dish;

    @BeforeEach
    public void setUp() {
        // Setup ingredients
        Ingredient beefIngredient = Ingredient.builder()
                .id(100l)
                .name("beef")
                .tag("beef")
                .quantity(2)
                .build();

        Ingredient garlicIngredient = Ingredient.builder()
                .id(101l)
                .name("garlic")
                .tag("garlic")
                .quantity(3)
                .build();

        // Setup comment
        Comment comment = Comment.builder()
                .id(201l)
                .content("Dish comment")
                .createdAt(LocalDateTime.of(2023, Month.NOVEMBER, 10, 12, 30))
                .build();

        // Setup dish
        dish = Dish.builder()
                .id(1l)
                .name("Burger")
                .description("Burger description")
                .tag("beef")
                .imageUrl("some-image-url")
                .price(14.99f)
                .ingredientIds(List.of(beefIngredient.getId(), garlicIngredient.getId()))
                .ingredients(List.of(beefIngredient, garlicIngredient))
                .comments(List.of(comment))
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

        // Ingredient Ids
        List<Long> ingredientIds = dish.getIngredientIds();
        assertEquals(100l, ingredientIds.get(0));
        assertEquals(101l, ingredientIds.get(1));

        // Ingredient objects
        List<Ingredient> ingredients = dish.getIngredients();
        assertEquals(100l, ingredients.get(0).getId());
        assertEquals("beef", ingredients.get(0).getName());

        assertEquals(101l, ingredients.get(1).getId());
        assertEquals("garlic", ingredients.get(1).getName());

        // Comments
        assertEquals(201, dish.getComments().get(0).getId());
        assertEquals("Dish comment", dish.getComments().get(0).getContent());
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
        dish.setIngredients(new ArrayList<>());
        dish.setComments(new ArrayList<>());

        assertEquals(2L, dish.getId());
        assertEquals("Chicken Alfredo", dish.getName());
        assertEquals("Chicken Alfredo description", dish.getDescription());
        assertEquals("chicken", dish.getTag());
        assertEquals("some-image-url-updated", dish.getImageUrl());
        assertEquals(14.99f, dish.getPrice());

        assertEquals(0, dish.getIngredientIds().size());
        assertEquals(0, dish.getIngredients().size());
        assertEquals(0, dish.getComments().size());
    }
}
