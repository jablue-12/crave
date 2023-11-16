package com.crave.backend.unit;

import com.crave.backend.model.RestaurantItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RestaurantItemTest {
    private RestaurantItem restaurantItem;

    @BeforeEach
    public void setUp() {
        restaurantItem = RestaurantItem.builder()
                .id(1L)
                .restaurant_id(1L)
                .name("pancake")
                .price(2.99f)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, restaurantItem.getId());
        assertEquals(1L, restaurantItem.getRestaurant_id());
        assertEquals("pancake", restaurantItem.getName());
        assertEquals(2.99f, restaurantItem.getPrice());
    }

    @Test
    void testSetters() {
        restaurantItem.setId(2L);
        restaurantItem.setRestaurant_id(2L);
        restaurantItem.setName("omelet");
        restaurantItem.setPrice(3.50f);


        assertEquals(2L, restaurantItem.getId());
        assertEquals(2L, restaurantItem.getRestaurant_id());
        assertEquals("omelet", restaurantItem.getName());
        assertEquals(3.50f, restaurantItem.getPrice());
    }
}
