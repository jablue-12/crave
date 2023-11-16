package com.crave.backend.unit;

import com.crave.backend.model.OrderItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class OrderItemTest {
    private OrderItem orderItem;

    @BeforeEach
    public void setUp() {
        orderItem = OrderItem.builder()
                .id(1L)
                .order_id(1L)
                .name("large fries")
                .price(3.99f)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, orderItem.getId());
        assertEquals(1L, orderItem.getOrder_id());
        assertEquals("large fries", orderItem.getName());
        assertEquals(3.99f, orderItem.getPrice());
    }

    @Test
    void testSetters() {
        orderItem.setId(2L);
        orderItem.setOrder_id(2L);
        orderItem.setName("chicken sandwich");
        orderItem.setPrice(4.99f);


        assertEquals(2L, orderItem.getId());
        assertEquals(2L, orderItem.getOrder_id());
        assertEquals("chicken sandwich", orderItem.getName());
        assertEquals(4.99f, orderItem.getPrice());
    }
}
