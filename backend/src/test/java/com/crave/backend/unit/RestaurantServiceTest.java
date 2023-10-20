package com.crave.backend.unit;

import com.crave.backend.model.Restaurant;
import com.crave.backend.repository.RestaurantRepository;
import com.crave.backend.service.RestaurantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RestaurantServiceTest {
    @Mock
    private RestaurantRepository restaurantRepository;
    private RestaurantService restaurantService;

    @BeforeEach
    void setUp() {
        restaurantService = new RestaurantService(restaurantRepository);
    }

    @Test
    void testGetRestaurants() {
        // Create a list of restaurants for testing
        List<Restaurant> restaurants = new ArrayList<>();
        restaurants.add(new Restaurant("Restaurant A", "Address A", 4.2, "imageA.jpg"));
        restaurants.add(new Restaurant("Restaurant B", "Address B", 4.4, "imageB.jpg"));

        // Mock the behavior of the repository findAll method
        when(restaurantRepository.findAll()).thenReturn(restaurants);

        // Call the service method
        List<Restaurant> retrievedRestaurants = restaurantService.getRestaurants();

        // Assertions
        assertEquals(2, retrievedRestaurants.size());
        assertEquals(restaurants.get(0), retrievedRestaurants.get(0));
        assertEquals(restaurants.get(1), retrievedRestaurants.get(1));
    }

    @Test
    void testCreateRestaurant() {
        // Create a restaurant
        Restaurant restaurantToCreate = new Restaurant("Olive Garden", "123 Pembina", 4.4, "testimage/olive-garden");

        // Mock the behavior of the repository save method
        when(restaurantRepository.save(restaurantToCreate)).thenReturn(restaurantToCreate);

        // Call the service method
        Restaurant createdRestaurant = restaurantService.createRestaurant(restaurantToCreate);

        // Verify that the repository's save method is called with the restaurant to create
        ArgumentCaptor<Restaurant> restaurantArgumentCaptor = ArgumentCaptor.forClass(Restaurant.class);
        verify(restaurantRepository).save(restaurantArgumentCaptor.capture());
        Restaurant capturedRestaurant = restaurantArgumentCaptor.getValue();

        // Assertions
        assertEquals(restaurantToCreate.getName(), capturedRestaurant.getName());
        assertEquals(restaurantToCreate.getAddress(), capturedRestaurant.getAddress());
        assertEquals(restaurantToCreate.getRating(), capturedRestaurant.getRating());
        assertEquals(restaurantToCreate.getImageUrl(), capturedRestaurant.getImageUrl());

        // Additional assertion to ensure the correct restaurant is returned by the service
        assertEquals(restaurantToCreate, createdRestaurant);
    }

    @Test
    void testGetRestaurantById() {
        // Create a restaurant
        Restaurant restaurant = new Restaurant("Olive Garden", "123 Pembina", 4.4, "testimage/olive-garden");
        Long restaurantId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));

        // Call the service method
        Optional<Restaurant> foundRestaurant = restaurantService.getRestaurantById(restaurantId);

        // Assertions
        assertTrue(foundRestaurant.isPresent());
        assertEquals(restaurant, foundRestaurant.get());
    }

    @Test
    void testUpdateRestaurant() {
        // Create an existing restaurant
        Restaurant existingRestaurant = new Restaurant("Olive Garden", "123 Pembina", 4.4, "testimage/olive-garden");

        // Create an updated restaurant
        Restaurant updatedRestaurant = new Restaurant("Updated Garden", "456 Elm Street", 4.2, "testimage/updated-garden");

        // Mock the behavior of the repository save method
        when(restaurantRepository.save(existingRestaurant)).thenReturn(existingRestaurant);

        // Call the service method
        Restaurant updatedResult = restaurantService.updateRestaurant(existingRestaurant, updatedRestaurant);

        // Assertions
        assertEquals(updatedRestaurant.getName(), existingRestaurant.getName());
        assertEquals(updatedRestaurant.getAddress(), existingRestaurant.getAddress());
        assertEquals(updatedRestaurant.getRating(), existingRestaurant.getRating());
        assertEquals(updatedRestaurant.getImageUrl(), existingRestaurant.getImageUrl());
        assertEquals(existingRestaurant, updatedResult);
    }

    @Test
    void testDeleteRestaurantById() {
        Long restaurantId = 1L;

        // Call the service method
        restaurantService.deleteRestaurantById(restaurantId);

        // Verify that the repository's deleteById method is called with the correct ID
        verify(restaurantRepository).deleteById(restaurantId);
    }

    @Test
    void testFindById() {
        // Create a restaurant
        Restaurant restaurant = new Restaurant("Olive Garden", "123 Pembina", 4.4, "testimage/olive-garden");
        Long restaurantId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));

        // Call the service method
        Restaurant foundRestaurant = restaurantService.findById(restaurantId);

        // Assertions
        assertNotNull(foundRestaurant);
        assertEquals(restaurant, foundRestaurant);
    }
    
    @Test
    void testRestaurantExists() {
        Long restaurantId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(new Restaurant()));

        // Call the service method
        boolean restaurantExists = restaurantService.exists(restaurantId);

        // Assertion
        assertTrue(restaurantExists);
    }

    @Test
    void testRestaurantDoesNotExist() {
        Long nonExistentRestaurantId = 99L; // A non-existent restaurant ID

        // Mock the behavior of the repository findById method for a non-existent restaurant
        when(restaurantRepository.findById(nonExistentRestaurantId)).thenReturn(Optional.empty());

        // Call the service method
        boolean restaurantNotFound = restaurantService.exists(nonExistentRestaurantId);

        // Assertion
        assertFalse(restaurantNotFound);
    }
}