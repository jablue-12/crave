package com.crave.backend.controller;

import com.crave.backend.enums.RestaurantTag;
import com.crave.backend.model.Restaurant;
import com.crave.backend.model.RestaurantItem;
import com.crave.backend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @GetMapping(path="/tags")
    public List<Restaurant> getRestaurantsByTags(@RequestBody List<String> tags) {
        Set<RestaurantTag> tagSet = new HashSet<RestaurantTag>();
        for (String tagName : tags) {
            try {
                tagSet.add(RestaurantTag.valueOf(tagName));
            } catch (IllegalArgumentException e) {
                return new ArrayList<Restaurant>();
            }
        }
        return restaurantService.getRestaurantsByTags(tagSet);
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

        Restaurant updated = restaurantService.updateRestaurant(updatedRestaurant);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PutMapping(path="/addtags/{id}")
    public ResponseEntity<Restaurant> addTagsToRestaurants(@PathVariable Long id, @RequestBody List<String> tags ) {
        
        Restaurant existingRestaurant = restaurantService.findById(id);

        Set<RestaurantTag> tagSet = new HashSet<RestaurantTag>();
        for (String tagName : tags) {
            try {
                tagSet.add(RestaurantTag.valueOf(tagName));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }

        if (existingRestaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingRestaurant.getTags().addAll(tagSet);
        return new ResponseEntity<>(restaurantService.updateRestaurant(existingRestaurant),  HttpStatus.OK);
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
