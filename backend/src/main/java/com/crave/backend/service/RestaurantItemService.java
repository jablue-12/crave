package com.crave.backend.service;

import com.crave.backend.model.RestaurantItem;
import com.crave.backend.repository.RestaurantItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantItemService {
    private final RestaurantItemRepository restaurantItemRepository;

    @Autowired
    public RestaurantItemService(RestaurantItemRepository restaurantItemRepository) {
        this.restaurantItemRepository = restaurantItemRepository;
    }

    public List<RestaurantItem> getRestaurantItems() {
        return restaurantItemRepository.findAll();
    }

    public Optional<RestaurantItem> getRestaurantItemById(Long id) {
        return restaurantItemRepository.findById(id);
    }

    public RestaurantItem createRestaurantItem(RestaurantItem restaurantItem) {
        return restaurantItemRepository.save(restaurantItem);
    }

    public RestaurantItem updateRestaurantItem(RestaurantItem updatedRestaurantItem) {

        if (exists(updatedRestaurantItem.getId())) {
            restaurantItemRepository.save(updatedRestaurantItem);
        }

        return updatedRestaurantItem;
    }

    public List<RestaurantItem> getRestaurantItemByRestaurantId(Long id) {
        List<RestaurantItem> restaurantItems = restaurantItemRepository.findAllByResaurantId(id);
        return restaurantItems;
    }

    public void deleteRestaurantItemById(Long id) {
        restaurantItemRepository.deleteById(id);
    }

    public RestaurantItem findById(Long id) {
        Optional<RestaurantItem> restaurantItem = restaurantItemRepository.findById(id);
        return restaurantItem.orElse(null);
    }

    public boolean exists(Long id) {
        return restaurantItemRepository.findById(id).isPresent();
    }
}
