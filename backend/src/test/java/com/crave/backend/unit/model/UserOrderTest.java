package com.crave.backend.unit.model;

import com.crave.backend.enums.OrderStatus;
import com.crave.backend.model.UserOrder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserOrderTest {
    private UserOrder userOrder;

    @BeforeEach
    public void setUp() {
        userOrder = UserOrder.builder()
                .id(1L)
                .total(20.00f)
                .email("test.email@hotmail.com")
                .placedAt("now")
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, userOrder.getId());
        assertEquals(20.00f, userOrder.getTotal());
        assertEquals("test.email@hotmail.com", userOrder.getEmail());
        assertEquals("now", userOrder.getPlacedAt());
    }

    @Test
    void testSetters() {
        userOrder.setId(2L);
        userOrder.setTotal(30.00f);
        userOrder.setEmail("updated.email@hotmail.com");
        userOrder.setPlacedAt("updated");


        assertEquals(2L, userOrder.getId());
        assertEquals(30.00f, userOrder.getTotal());
        assertEquals("updated.email@hotmail.com", userOrder.getEmail());
        assertEquals("updated", userOrder.getPlacedAt());
    }
}
