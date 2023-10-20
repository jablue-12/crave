package com.crave.backend.controller;

import com.crave.backend.model.Restaurant;
import com.crave.backend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantService.getRestaurants();
    }

    @GetMapping(path = "/{id}")
    public Optional<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant newRestaurant = restaurantService.createRestaurant(restaurant);
        return new ResponseEntity<>(newRestaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant updatedRestaurant) {
        Restaurant existingRestaurant = restaurantService.findById(id);

        if (existingRestaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Restaurant updated = restaurantService.updateRestaurant(existingRestaurant, updatedRestaurant);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {
        if (!restaurantService.exists(id)) {
            return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
        }

        restaurantService.deleteRestaurantById(id);
        return new ResponseEntity<>("Restaurant deleted successfully", HttpStatus.NO_CONTENT);
    }

}
