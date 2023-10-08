package com.crave.backend.service;

import com.crave.backend.model.Restaurant;
import com.crave.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Restaurant existingRestaurant, Restaurant updatedRestaurant) {

        if (existingRestaurant != null) {
            existingRestaurant.setName(updatedRestaurant.getName());
            existingRestaurant.setAddress(updatedRestaurant.getAddress());
            existingRestaurant.setRating(updatedRestaurant.getRating());
            existingRestaurant.setImageUrl(updatedRestaurant.getImageUrl());

            restaurantRepository.save(existingRestaurant);
        }

        return existingRestaurant;
    }

    public void deleteRestaurantById(Long id) {
        restaurantRepository.deleteById(id);
    }

    public Restaurant findById(Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant.orElse(null);
    }

    public boolean exists(Long id) {
        return restaurantRepository.findById(id).isPresent();
    }
}
