package com.crave.backend.unit.service;

import com.crave.backend.model.UserOrder;
import com.crave.backend.repository.UserOrderRepository;
import com.crave.backend.service.UserOrderService;
import com.crave.backend.enums.OrderStatus;
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
class UserOrderServiceTest {
    @Mock
    private UserOrderRepository userOrderRepository;
    private UserOrderService userOrderService;

    @BeforeEach
    void setUp() {
        userOrderService = new UserOrderService(userOrderRepository);
    }

    @Test
    void testGetUserOrders() {
        // Create a list of userOrders for testing
        List<UserOrder> userOrders = new ArrayList<>();
        userOrders.add(new UserOrder());
        userOrders.add(new UserOrder());

        // Mock the behavior of the repository findAll method
        when(userOrderRepository.findAll()).thenReturn(userOrders);

        // Call the service method
        List<UserOrder> retrievedUserOrders = userOrderService.getOrders();

        // Assertions
        assertEquals(2, retrievedUserOrders.size());
        assertEquals(userOrders.get(0), retrievedUserOrders.get(0));
        assertEquals(userOrders.get(1), retrievedUserOrders.get(1));
    }

    @Test
    void testCreateUserOrder() {
        // Create a userOrder
        UserOrder userOrderToCreate = new UserOrder();

        // Mock the behavior of the repository save method
        when(userOrderRepository.save(userOrderToCreate)).thenReturn(userOrderToCreate);

        // Call the service method
        UserOrder createdUserOrder = userOrderService.createOrder(userOrderToCreate);

        // Verify that the repository's save method is called with the userOrder to create
        ArgumentCaptor<UserOrder> userOrderArgumentCaptor = ArgumentCaptor.forClass(UserOrder.class);
        verify(userOrderRepository).save(userOrderArgumentCaptor.capture());
        UserOrder capturedUserOrder = userOrderArgumentCaptor.getValue();


        // Additional assertion to ensure the correct userOrder is returned by the service
        assertEquals(userOrderToCreate, createdUserOrder);
    }

    @Test
    void testGetUserOrderById() {
        // Create a userOrder
        UserOrder userOrder = new UserOrder();
        Long userOrderId = 1L;

        // Mock the behavior of the repository findById method
        when(userOrderRepository.findById(userOrderId)).thenReturn(Optional.of(userOrder));

        // Call the service method
        Optional<UserOrder> foundUserOrder = userOrderService.getOrderById(userOrderId);

        // Assertions
        assertTrue(foundUserOrder.isPresent());
        assertEquals(userOrder, foundUserOrder.get());
    }


    @Test
    void testDeleteUserOrderById() {
        Long userOrderId = 1L;

        // Call the service method
        userOrderService.deleteOrderById(userOrderId);

        // Verify that the repository's deleteById method is called with the correct ID
        verify(userOrderRepository).deleteById(userOrderId);
    }

    @Test
    void testFindById() {
        // Create a userOrder
        UserOrder userOrder = new UserOrder();
        Long userOrderId = 1L;

        // Mock the behavior of the repository findById method
        when(userOrderRepository.findById(userOrderId)).thenReturn(Optional.of(userOrder));

        // Call the service method
        UserOrder foundUserOrder = userOrderService.findById(userOrderId);

        // Assertions
        assertNotNull(foundUserOrder);
        assertEquals(userOrder, foundUserOrder);
    }

    @Test
    void testUserOrderExists() {
        Long userOrderId = 1L;

        // Mock the behavior of the repository findById method
        when(userOrderRepository.findById(userOrderId)).thenReturn(Optional.of(new UserOrder()));

        // Call the service method
        boolean userOrderExists = userOrderService.exists(userOrderId);

        // Assertion
        assertTrue(userOrderExists);
    }

    @Test
    void testUserOrderDoesNotExist() {
        Long nonExistentUserOrderId = 99L; // A non-existent userOrder ID

        // Mock the behavior of the repository findById method for a non-existent userOrder
        when(userOrderRepository.findById(nonExistentUserOrderId)).thenReturn(Optional.empty());

        // Call the service method
        boolean userOrderNotFound = userOrderService.exists(nonExistentUserOrderId);

        // Assertion
        assertFalse(userOrderNotFound);
    }
}