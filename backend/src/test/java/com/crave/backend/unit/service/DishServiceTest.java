package com.crave.backend.unit.service;

import com.crave.backend.model.Dish;
import com.crave.backend.repository.DishRepository;
import com.crave.backend.repository.IngredientRepository;
import com.crave.backend.service.DishService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DishServiceTest {

    @Mock
    private DishRepository dishRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private DishService dishService;

    @BeforeEach
    void setUp() {
        dishService = new DishService(dishRepository, ingredientRepository);
    }

    @Test
    void testGetDishes() {
        // Create a list of dishes for testing
        List<Dish> dishes = new ArrayList<>();
        dishes.add(new Dish());
        dishes.add(new Dish());

        // Mock the behavior of the repository findAll method
        when(dishRepository.findAll()).thenReturn(dishes);

        // Mock the behavior of the ingredientRepository findAllById method
        when(ingredientRepository.findAllById(any())).thenReturn(new ArrayList<>());

        // Call the service method
        List<Dish> retrievedDishes = dishService.getDishes();

        // Assertions
        assertEquals(2, retrievedDishes.size());
        assertEquals(dishes.get(0), retrievedDishes.get(0));
        assertEquals(dishes.get(1), retrievedDishes.get(1));
    }

    @Test
    void testCreateDish_SuccessfulCreation() {
        // Create a dish
        Dish dishToCreate = new Dish();
        List <Long> ingredients = new ArrayList<>();
        ingredients.add(1L);
        ingredients.add(2L);
        ingredients.add(3L);
        ingredients.add(4L);
        dishToCreate.setIngredientIds(ingredients);

        // Mock the behavior of the repository save method
        when(dishRepository.save(dishToCreate)).thenReturn(dishToCreate);

        // Mock the behavior of the ingredientRepository existsById method
        when(ingredientRepository.existsById(anyLong())).thenReturn(true);

        // Mock the behavior of the ingredientRepository findAllById method
        when(ingredientRepository.findAllById(any())).thenReturn(new ArrayList<>());

        // Call the service method
        Dish createdDish = dishService.createDish(dishToCreate);

        // Verify that the repository's save method is called with the dish to create
        verify(dishRepository).save(dishToCreate);

        // Assertions
        assertNotNull(createdDish);
        assertEquals(dishToCreate, createdDish);
    }
}
