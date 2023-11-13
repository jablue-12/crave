package com.crave.backend.unit;

import com.crave.backend.model.RestaurantItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RestaurantItemTest {
    private RestaurantItem restaurantItem;

    @BeforeEach
    public void setUp() {
        restaurantItem = new RestaurantItem(1L, 1L, "pancake", 2.99f);
    }

    @Test
    void testGetters() {
        assertEquals(1L, restaurantItem.getId());
        assertEquals(1L, restaurantItem.getRestaurantId());
        assertEquals("pancake", restaurantItem.getName());
        assertEquals(2.99f, restaurantItem.getPrice());
    }

    @Test
    void testSetters() {
        restaurantItem.setId(2L);
        restaurantItem.setRestaurantId(2L);
        restaurantItem.setName("omelet");
        restaurantItem.setPrice(3.50f);


        assertEquals(2L, restaurantItem.getId());
        assertEquals(2L, restaurantItem.getRestaurantId());
        assertEquals("omelet", restaurantItem.getName());
        assertEquals(3.50f, restaurantItem.getPrice());
    }
}
