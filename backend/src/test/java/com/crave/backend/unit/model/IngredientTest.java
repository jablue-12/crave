package com.crave.backend.unit.model;

import com.crave.backend.model.Ingredient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class IngredientTest {
    private Ingredient ingredient;

    @BeforeEach
    public void setUp() {

        ingredient = Ingredient.builder()
                .id(1l)
                .name("Garlic")
                .tag("garlic tag")
                .quantity(2)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, ingredient.getId());
        assertEquals("Garlic", ingredient.getName());
        assertEquals("garlic tag", ingredient.getTag());
        assertEquals(2, ingredient.getQuantity());
    }

    @Test
    void testSetters() {
        ingredient.setId(2L);
        ingredient.setName("beef");
        ingredient.setTag("beef tag");
        ingredient.setQuantity(1);

        assertEquals(2L, ingredient.getId());
        assertEquals("beef", ingredient.getName());
        assertEquals("beef tag", ingredient.getTag());
        assertEquals(1, ingredient.getQuantity());
    }
}
