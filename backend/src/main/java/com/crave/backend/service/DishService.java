package com.crave.backend.service;

import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import com.crave.backend.repository.DishRepository;
import com.crave.backend.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DishService {
    private final DishRepository dishRepository;
    private final IngredientRepository ingredientRepository;

    public List<Dish> getDishes() {
        return dishRepository.findAll();
    }

    public Dish createDish(Dish dish) {
        List<Long> ingredientIds = dish.getIngredientIds();

        // Check if id of ingredient exists
        for (Long ingredientId : ingredientIds) {
            if (!ingredientRepository.existsById(ingredientId)) {
                throw new IllegalArgumentException("Ingredient with ID " + ingredientId + " does not exist");
            }
        }

        List<Ingredient> ingredients = ingredientRepository.findAllById(dish.getIngredientIds());
        dish.setIngredients(ingredients);

        return dishRepository.save(dish);
    }

    public List<Dish> getByTags(List<String> tags) {
        return dishRepository.findByTagIn(tags);
    }
}

