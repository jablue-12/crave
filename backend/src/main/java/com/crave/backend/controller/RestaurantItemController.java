package com.crave.backend.controller;

import com.crave.backend.model.RestaurantItem;
import com.crave.backend.service.RestaurantItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "restaurantitems")
public class RestaurantItemController {
    private final RestaurantItemService restaurantItemService;

    @Autowired
    public RestaurantItemController(RestaurantItemService restaurantItemService) {
        this.restaurantItemService = restaurantItemService;
    }

    @GetMapping
    public List<RestaurantItem> getRestaurantItems() {
        return restaurantItemService.getRestaurantItems();
    }
    
    @GetMapping(path = "/{id}")
    public Optional<RestaurantItem> getRestaurantItemById(@PathVariable Long id) {
        return restaurantItemService.getRestaurantItemById(id);
    }

    @GetMapping(path = "/restaurant/{restaurantId}")
    public List<RestaurantItem> getRestaurantItemByRestaurantId(@PathVariable Long restaurantId) {
        return restaurantItemService.getRestaurantItemByRestaurantId(restaurantId);
    }

    @PostMapping
    public ResponseEntity<RestaurantItem> createRestaurantItem(@RequestBody RestaurantItem restaurantItem) {
        RestaurantItem newRestaurantItem = restaurantItemService.createRestaurantItem(restaurantItem);
        return new ResponseEntity<>(newRestaurantItem, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantItem> updateRestaurantItem(@PathVariable Long id, @RequestBody RestaurantItem updatedRestaurantItem) {
        RestaurantItem existingRestaurantItem = restaurantItemService.findById(id);

        if (existingRestaurantItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        RestaurantItem updated = restaurantItemService.updateRestaurantItem(updatedRestaurantItem);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurantItem(@PathVariable Long id) {
        if (!restaurantItemService.exists(id)) {
            return new ResponseEntity<>("RestaurantItem not found", HttpStatus.NOT_FOUND);
        }

        restaurantItemService.deleteRestaurantItemById(id);
        return new ResponseEntity<>("RestaurantItem deleted successfully", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/restaurant/{restaurantId}")
    public ResponseEntity<String> deleteRestaurantItemByRestaurantId(@PathVariable Long restaurantId) {
        restaurantItemService.deleteRestaurantItemByRestaurantId(restaurantId);
        return new ResponseEntity<>("RestaurantItems deleted successfully", HttpStatus.NO_CONTENT);
    }

}
