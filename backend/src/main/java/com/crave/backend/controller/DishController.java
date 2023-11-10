package com.crave.backend.controller;

import com.crave.backend.model.Dish;
import com.crave.backend.service.DishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/dishes")
@RequiredArgsConstructor
public class DishController {
    private final DishService dishService;

    @GetMapping
    public ResponseEntity<List<Dish>> getDishes() {
        return ok(dishService.getDishes());
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> createDish(@RequestBody Dish dish) {
        try {
            Dish newDish = dishService.createDish(dish);
            return new ResponseEntity<>(newDish, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/byTags")
    public ResponseEntity<List<Dish>> getByTags(@RequestParam(value = "tags", required = false) List<String> tags) {
        return ok(dishService.getByTags(tags));
    }
}

