package com.crave.backend.unit.service;

import com.crave.backend.model.Ingredient;
import com.crave.backend.repository.IngredientRepository;
import com.crave.backend.service.IngredientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @BeforeEach
    void setUp() {
        ingredientService = new IngredientService(ingredientRepository);
    }

    @Test
    void testGetIngredients() {
        // Create a list of ingredients for testing
        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());
        ingredients.add(new Ingredient());

        // Mock the behavior of the repository findAll method
        when(ingredientRepository.findAll()).thenReturn(ingredients);

        // Call the service method
        List<Ingredient> retrievedIngredients = ingredientService.getIngredients();

        // Assertions
        assertEquals(2, retrievedIngredients.size());
        assertEquals(ingredients.get(0), retrievedIngredients.get(0));
        assertEquals(ingredients.get(1), retrievedIngredients.get(1));
    }

    @Test
    void testCreateIngredient() {
        // Create an ingredient
        Ingredient ingredientToCreate = new Ingredient();

        // Mock the behavior of the repository save method
        when(ingredientRepository.save(ingredientToCreate)).thenReturn(ingredientToCreate);

        // Call the service method
        Ingredient createdIngredient = ingredientService.createIngredient(ingredientToCreate);

        // Verify that the repository's save method is called with the ingredient to create
        verify(ingredientRepository).save(ingredientToCreate);

        // Assertions
        assertEquals(ingredientToCreate, createdIngredient);
    }

    // Add more test methods based on the functionality of the IngredientService class
}
