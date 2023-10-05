package com.crave.backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RestaurantTest {
    private Restaurant restaurant;

    @BeforeEach
    public void setUp() {
        restaurant = new Restaurant(1L, "Olive Garden", "123 Pembina", 4.4, "testimage/olivegarden");
    }

    @Test
    void testGetters() {
        assertEquals(1, restaurant.getId());
        assertEquals("Olive Garden", restaurant.getName());
        assertEquals("123 Pembina", restaurant.getAddress());
        assertEquals(4.4, restaurant.getRating());
        assertEquals("testimage/olivegarden", restaurant.getImageUrl());
    }

    @Test
    void testSetters() {
        restaurant.setId(2L);
        restaurant.setName("Boston Pizza");
        restaurant.setAddress("111 Kingsbury St");
        restaurant.setRating(4.2);
        restaurant.setImageUrl("testimage/bostonpizza");

        assertEquals(2, restaurant.getId());
        assertEquals("Boston Pizza", restaurant.getName());
        assertEquals("111 Kingsbury St", restaurant.getAddress());
        assertEquals(4.2, restaurant.getRating());
        assertEquals("testimage/bostonpizza", restaurant.getImageUrl());
    }
}
