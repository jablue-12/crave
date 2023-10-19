package com.crave.backend.unit;

import com.crave.backend.enums.OrderStatus;
import com.crave.backend.model.UserOrder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserOrderTest {
    private UserOrder userOrder;

    @BeforeEach
    public void setUp() {
        userOrder = new UserOrder(1L, 1L, 1L, OrderStatus.START);
    }

    @Test
    void testGetters() {
        assertEquals(1L, userOrder.getId());
        assertEquals(1L, userOrder.getUser_id());
        assertEquals(1L, userOrder.getRestaurant_id());
        assertEquals(OrderStatus.START, userOrder.getStatus());
    }

    @Test
    void testSetters() {
        userOrder.setId(2L);
        userOrder.setUser_id(2L);
        userOrder.setRestaurant_id(2L);
        userOrder.setStatus(OrderStatus.IN_PROGRESS);


        assertEquals(2L, userOrder.getId());
        assertEquals(2L, userOrder.getUser_id());
        assertEquals(2L, userOrder.getRestaurant_id());
        assertEquals(OrderStatus.IN_PROGRESS, userOrder.getStatus());
    }
}
