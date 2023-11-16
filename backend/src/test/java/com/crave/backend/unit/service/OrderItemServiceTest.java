package com.crave.backend.unit.service;

import com.crave.backend.model.OrderItem;
import com.crave.backend.repository.OrderItemRepository;
import com.crave.backend.service.OrderItemService;
import com.crave.backend.service.UserOrderService;

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
class OrderItemServiceTest {

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private OrderItemService orderItemService;

    private OrderItem createOrderItem(String name, float price) {
        return new OrderItem(1L, name, price);
    }

    @BeforeEach
    void setUp() {
        orderItemService = new OrderItemService(orderItemRepository);
    }

    @Test
    void testGetOrderItems() {
        // Create a list of order items for testing
        List<OrderItem> orderItems = new ArrayList<>();
        orderItems.add(createOrderItem("Pizza", 12.99f));
        orderItems.add(createOrderItem("Burger", 8.99f));

        // Mock the behavior of the repository findAll method
        when(orderItemRepository.findAll()).thenReturn(orderItems);

        // Call the service method
        List<OrderItem> retrievedOrderItems = orderItemService.getOrderItems();

        // Assertions
        assertEquals(2, retrievedOrderItems.size());
        assertEquals(orderItems, retrievedOrderItems);
    }

    @Test
    void testGetOrderItemById() {
        // Create an order item
        OrderItem orderItem = createOrderItem("Pizza", 12.99f);
        Long orderItemId = 1L;

        // Mock the behavior of the repository findById method
        when(orderItemRepository.findById(orderItemId)).thenReturn(Optional.of(orderItem));

        // Call the service method
        Optional<OrderItem> foundOrderItem = orderItemService.getOrderItemById(orderItemId);

        // Assertions
        assertTrue(foundOrderItem.isPresent());
        assertEquals(orderItem, foundOrderItem.get());
    }

    @Test
    void testCreateOrderItem() {
        // Create an order item
        OrderItem orderItemToCreate = createOrderItem("Pizza", 12.99f);

        // Mock the behavior of the repository save method
        when(orderItemRepository.save(orderItemToCreate)).thenReturn(orderItemToCreate);

        // Call the service method
        OrderItem createdOrderItem = orderItemService.createOrderItem(orderItemToCreate);

        // Assertions
        assertEquals(orderItemToCreate, createdOrderItem);
    }

    @Test
    void testUpdateOrderItem() {
        // Create an existing order item
        OrderItem existingOrderItem = createOrderItem("Pizza", 12.99f);

        // Create an updated order item
        OrderItem updatedOrderItem = createOrderItem("Pasta", 15.99f);

        // Mock the behavior of the repository save method
        when(orderItemRepository.save(existingOrderItem)).thenReturn(existingOrderItem);

        // Call the service method
        OrderItem updatedResult = orderItemService.updateOrderItem(existingOrderItem, updatedOrderItem);

        // Assertions
        assertEquals(updatedOrderItem.getName(), updatedResult.getName());
        assertEquals(updatedOrderItem.getPrice(), updatedResult.getPrice());
        assertEquals(existingOrderItem, updatedResult);
    }

    @Test
    void testDeleteOrderItemById() {
        Long orderItemId = 1L;

        // Call the service method
        orderItemService.deleteOrderItemById(orderItemId);

        // Verify that the repository's deleteById method is called with the correct ID
        verify(orderItemRepository).deleteById(orderItemId);
    }

    @Test
    void testFindById() {
        // Create an order item
        OrderItem orderItem = createOrderItem("Pizza", 12.99f);
        Long orderItemId = 1L;

        // Mock the behavior of the repository findById method
        when(orderItemRepository.findById(orderItemId)).thenReturn(Optional.of(orderItem));

        // Call the service method
        OrderItem foundOrderItem = orderItemService.findById(orderItemId);

        // Assertions
        assertNotNull(foundOrderItem);
        assertEquals(orderItem, foundOrderItem);
    }

    @Test
    void testOrderItemExists() {
        Long orderItemId = 1L;

        // Mock the behavior of the repository findById method
        when(orderItemRepository.findById(orderItemId)).thenReturn(Optional.of(createOrderItem("Pizza", 12.99f)));

        // Call the service method
        boolean orderItemExists = orderItemService.exists(orderItemId);

        // Assertion
        assertTrue(orderItemExists);
    }

    @Test
    void testOrderItemDoesNotExist() {
        Long nonExistentOrderItemId = 99L; // A non-existent order item ID

        // Mock the behavior of the repository findById method for a non-existent order item
        when(orderItemRepository.findById(nonExistentOrderItemId)).thenReturn(Optional.empty());

        // Call the service method
        boolean orderItemNotFound = orderItemService.exists(nonExistentOrderItemId);

        // Assertion
        assertFalse(orderItemNotFound);
    }
}