package com.crave.backend.service;

import com.crave.backend.model.Restaurant;
import com.crave.backend.model.RestaurantItem;
import com.crave.backend.model.UserOrder;


import com.crave.backend.repository.RestaurantRepository;
import com.crave.backend.repository.RestaurantItemRepository;
import com.crave.backend.repository.UserOrderRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final RestaurantItemRepository restaurantItemRepository;
    private final UserOrderRepository userOrderRepository;

    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public List<UserOrder> getRestaurantOrders(Long restaurantId) {
        List<UserOrder> orders = userOrderRepository.findAllByRestaurantId(restaurantId);
        return orders;
    }

    public Restaurant updateRestaurant(Restaurant updatedRestaurant) {
        if(exists(updatedRestaurant.getId())){
            restaurantRepository.save(updatedRestaurant);
        }
        
        return updatedRestaurant;
    }
    
    public Restaurant addRestaurantItemById(Restaurant updatedRestaurant, Long restaurantItemId) {
        if (!restaurantItemRepository.existsById(restaurantItemId)) {
            return updatedRestaurant;
        }
        
        RestaurantItem newItem = restaurantItemRepository.findById(restaurantItemId).orElse(null);
        updatedRestaurant.getRestaurantItems().add(newItem);
        restaurantRepository.save(updatedRestaurant);
        return updatedRestaurant;
    }

    public Restaurant addRestaurantItemsById(Restaurant updatedRestaurant, List<Long> restaurantItemIds) {
        for (Long restaurantItemId : restaurantItemIds) {
            if (!restaurantItemRepository.existsById(restaurantItemId)) {
                return updatedRestaurant;
            }
        }

        List <RestaurantItem> newItems = restaurantItemRepository.findAllById(restaurantItemIds);
        updatedRestaurant.getRestaurantItems().addAll(newItems);
        restaurantRepository.save(updatedRestaurant);
        return updatedRestaurant;
    }

    public Restaurant addRestaurantItem(Restaurant updatedRestaurant, RestaurantItem restaurantItem) {
        restaurantItemRepository.save(restaurantItem);
        updatedRestaurant.getRestaurantItems().add(restaurantItem);
        restaurantRepository.save(updatedRestaurant);
        return updatedRestaurant;
    }

    public Restaurant addRestaurantItems(Restaurant updatedRestaurant, List<RestaurantItem> restaurantItems) {
        restaurantItemRepository.saveAll(restaurantItems);
        updatedRestaurant.getRestaurantItems().addAll(restaurantItems);
        restaurantRepository.save(updatedRestaurant);
        return updatedRestaurant;
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
