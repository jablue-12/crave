package com.crave.backend.unit.service;

import com.crave.backend.model.RestaurantItem;
import com.crave.backend.repository.RestaurantItemRepository;
import com.crave.backend.service.RestaurantItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RestaurantItemServiceTest {

    @Mock
    private RestaurantItemRepository restaurantItemRepository;

    @InjectMocks
    private RestaurantItemService restaurantItemService;

    private RestaurantItem createRestaurantItem(String name, float price) {
        return new RestaurantItem(1L, name, price);
    }

    @Test
    void testGetRestaurantItems() {
        // Create a list of restaurant items for testing
        List<RestaurantItem> restaurantItems = new ArrayList<>();
        restaurantItems.add(createRestaurantItem("Pizza", 12.99f));
        restaurantItems.add(createRestaurantItem("Burger", 8.99f));

        // Mock the behavior of the repository findAll method
        when(restaurantItemRepository.findAll()).thenReturn(restaurantItems);

        // Call the service method
        List<RestaurantItem> retrievedRestaurantItems = restaurantItemService.getRestaurantItems();

        // Assertions
        assertEquals(2, retrievedRestaurantItems.size());
        assertEquals(restaurantItems, retrievedRestaurantItems);
    }

    @Test
    void testGetRestaurantItemById() {
        // Create a restaurant item
        RestaurantItem restaurantItem = createRestaurantItem("Pizza", 12.99f);
        Long restaurantItemId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantItemRepository.findById(restaurantItemId)).thenReturn(Optional.of(restaurantItem));

        // Call the service method
        Optional<RestaurantItem> foundRestaurantItem = restaurantItemService.getRestaurantItemById(restaurantItemId);

        // Assertions
        assertTrue(foundRestaurantItem.isPresent());
        assertEquals(restaurantItem, foundRestaurantItem.get());
    }

    @Test
    void testCreateRestaurantItem() {
        // Create a restaurant item
        RestaurantItem restaurantItemToCreate = createRestaurantItem("Pizza", 12.99f);

        // Mock the behavior of the repository save method
        when(restaurantItemRepository.save(restaurantItemToCreate)).thenReturn(restaurantItemToCreate);

        // Call the service method
        RestaurantItem createdRestaurantItem = restaurantItemService.createRestaurantItem(restaurantItemToCreate);

        // Assertions
        assertEquals(restaurantItemToCreate, createdRestaurantItem);
    }

    @Test
    void testUpdateRestaurantItem() {
        // Create an existing restaurant item
        RestaurantItem existingRestaurantItem = createRestaurantItem("Pizza", 12.99f);

        // Create an updated restaurant item
        RestaurantItem updatedRestaurantItem = createRestaurantItem("Pasta", 15.99f);

        // Mock the behavior of the repository save method
        when(restaurantItemRepository.save(existingRestaurantItem)).thenReturn(existingRestaurantItem);

        // Call the service method
        RestaurantItem updatedResult = restaurantItemService.updateRestaurantItem(existingRestaurantItem, updatedRestaurantItem);

        // Assertions
        assertEquals(updatedRestaurantItem.getName(), updatedResult.getName());
        assertEquals(updatedRestaurantItem.getPrice(), updatedResult.getPrice());
        assertEquals(existingRestaurantItem, updatedResult);
    }

    @Test
    void testDeleteRestaurantItemById() {
        Long restaurantItemId = 1L;

        // Call the service method
        restaurantItemService.deleteRestaurantItemById(restaurantItemId);

        // Verify that the repository's deleteById method is called with the correct ID
        verify(restaurantItemRepository).deleteById(restaurantItemId);
    }

    @Test
    void testFindById() {
        // Create a restaurant item
        RestaurantItem restaurantItem = createRestaurantItem("Pizza", 12.99f);
        Long restaurantItemId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantItemRepository.findById(restaurantItemId)).thenReturn(Optional.of(restaurantItem));

        // Call the service method
        RestaurantItem foundRestaurantItem = restaurantItemService.findById(restaurantItemId);

        // Assertions
        assertNotNull(foundRestaurantItem);
        assertEquals(restaurantItem, foundRestaurantItem);
    }

    @Test
    void testRestaurantItemExists() {
        Long restaurantItemId = 1L;

        // Mock the behavior of the repository findById method
        when(restaurantItemRepository.findById(restaurantItemId)).thenReturn(Optional.of(createRestaurantItem("Pizza", 12.99f)));

        // Call the service method
        boolean restaurantItemExists = restaurantItemService.exists(restaurantItemId);

        // Assertion
        assertTrue(restaurantItemExists);
    }

    @Test
    void testRestaurantItemDoesNotExist() {
        Long nonExistentRestaurantItemId = 99L; // A non-existent restaurant item ID

        // Mock the behavior of the repository findById method for a non-existent restaurant item
        when(restaurantItemRepository.findById(nonExistentRestaurantItemId)).thenReturn(Optional.empty());

        // Call the service method
        boolean restaurantItemNotFound = restaurantItemService.exists(nonExistentRestaurantItemId);

        // Assertion
        assertFalse(restaurantItemNotFound);
    }
}
