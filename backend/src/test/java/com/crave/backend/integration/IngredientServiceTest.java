package com.crave.backend.integration;

import com.crave.backend.model.Ingredient;
import com.crave.backend.repository.IngredientRepository;
import com.crave.backend.service.IngredientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
public class IngredientServiceTest {

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Test
    public void testGetIngredients() {
        List<Ingredient> ingredients = ingredientService.getIngredients();
        assertEquals(0, ingredients.size());
    }

    @Test
    public void testCreateIngredient() {
        Ingredient ingredient = Ingredient.builder()
                .name("TestIngredient")
                .tag("TestTag")
                .quantity(1.0)
                .build();

        Ingredient createdIngredient = ingredientService.createIngredient(ingredient);

        assertEquals(ingredient.getName(), createdIngredient.getName());
        assertEquals(ingredient.getTag(), createdIngredient.getTag());
        assertEquals(ingredient.getQuantity(), createdIngredient.getQuantity());

        List<Ingredient> ingredients = ingredientService.getIngredients();
        assertEquals(1, ingredients.size());
    }
}