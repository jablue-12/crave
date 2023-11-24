package com.crave.backend.service;

import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import com.crave.backend.repository.DishRepository;
import com.crave.backend.repository.IngredientRepository;
import com.crave.backend.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DishService {
    private final DishRepository dishRepository;
    private final IngredientRepository ingredientRepository;

    public List<Dish> getDishes() {
        List<Dish> dishes = dishRepository.findAll();
        for (Dish dish : dishes) {
            List<Ingredient> ingredients = ingredientRepository.findAllById(dish.getIngredientIds());
            dish.setIngredients(ingredients);
        }

        return dishes;
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

    public Dish uploadDishImage(Long id, MultipartFile file, String baseUrl) throws IOException {
        Dish dish = dishRepository.findById(id).orElse(null);

        if (dish != null && file != null) {
            byte[] compressedImage = ImageUtils.compressImage(file.getBytes());
            dish.setImageBytes(compressedImage);
            dish.setImageUrl(baseUrl + "/dishes/" + id + "/image");
            dish.setImageName(file.getOriginalFilename());
            dish = dishRepository.save(dish); // Save the updated dish with compressed image
        }

        return dish;
    }

    public byte[] downloadImage(Long id) throws NullPointerException {
        Dish dish = dishRepository.findById(id).orElse(null);

        if (dish != null && dish.getImageBytes() != null) {
            return ImageUtils.decompressImage(dish.getImageBytes());
        }
        return new byte[0];
    }

    public Dish findDish(Long id) {
        return dishRepository.findById(id).orElse(null);
    }

    public List<Dish> getByTags(List<String> tags) {
        List<Dish> dishes = dishRepository.findAll();
        List<Dish> dishesWithTags = new ArrayList<>();
        for (Dish dish : dishes) {
            for (String tag : tags) {
                if (tag.equals(dish.getTag())) {
                    dishesWithTags.add(dish);
                }
            }
        }

        return dishesWithTags;
    }
}

