package com.crave.backend.service;

import com.crave.backend.model.RestaurantItem;
import com.crave.backend.model.Restaurant;
import com.crave.backend.repository.RestaurantItemRepository;
import com.crave.backend.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantItemService {
    private final RestaurantItemRepository restaurantItemRepository;
    private final RestaurantRepository restaurantRepository;

    public List<RestaurantItem> getRestaurantItems() {
        return restaurantItemRepository.findAll();
    }

    public Optional<RestaurantItem> getRestaurantItemById(Long id) {
        return restaurantItemRepository.findById(id);
    }

    public List<RestaurantItem> getRestaurantItemByRestaurantId(Long restaurantId) {
        List<RestaurantItem> restaurantItems = restaurantItemRepository.findAllByRestaurantId(restaurantId);
        return restaurantItems;
    }

    public RestaurantItem createRestaurantItem(RestaurantItem restaurantItem) {
        Restaurant theRestaurant = restaurantRepository.findById(restaurantItem.getRestaurantId()).orElse(null);
        if(theRestaurant == null){
            return null;
        }
        return restaurantItemRepository.save(restaurantItem);
    }

    public RestaurantItem updateRestaurantItem(RestaurantItem updatedRestaurantItem) {
        if (exists(updatedRestaurantItem.getId())) {
            restaurantItemRepository.save(updatedRestaurantItem);
        }

        return updatedRestaurantItem;
    }

    public void deleteRestaurantItemById(Long id) {
        restaurantItemRepository.deleteById(id);
    }

    public void deleteRestaurantItemByRestaurantId(Long restaurantId) {
        restaurantItemRepository.deleteByRestaurantId(restaurantId);
    }

    public RestaurantItem findById(Long id) {
        Optional<RestaurantItem> restaurantItem = restaurantItemRepository.findById(id);
        return restaurantItem.orElse(null);
    }

    public boolean exists(Long id) {
        return restaurantItemRepository.findById(id).isPresent();
    }
}
