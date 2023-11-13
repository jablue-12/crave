package com.crave.backend.service;

import com.crave.backend.model.UserOrder;
import com.crave.backend.repository.OrderItemRepository;
import com.crave.backend.repository.UserOrderRepository;

import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserOrderService {
    private final UserOrderRepository userOrderRepository;
   

    public List<UserOrder> getOrders() {
        return userOrderRepository.findAll();
    }

    public List<UserOrder> getOrdersByRestaurantId(Long restaurantId) {
        return userOrderRepository.findAllByRestaurantId(restaurantId);
    }

    public List<UserOrder> getOrdersByAccountId(Long accountId) {
        return userOrderRepository.findAllByAccountId(accountId);
    }

    public Optional<UserOrder> getOrderById(Long id) {
        return userOrderRepository.findById(id);
    }

    public UserOrder createOrder(UserOrder userOrder) {
        return userOrderRepository.save(userOrder);
    }

    public UserOrder updateOrder(UserOrder updatedUserOrder) {
        if(exists(updatedUserOrder.getId())) {
            userOrderRepository.save(updatedUserOrder);
        }
        return updatedUserOrder;
    }

    public void deleteOrderById(Long id) {
        userOrderRepository.deleteById(id);
    }

    public UserOrder findById(Long id) {
        Optional<UserOrder> order = userOrderRepository.findById(id);
        return order.orElse(null);
    }

    public boolean exists(Long id) {
        return userOrderRepository.findById(id).isPresent();
    }
}
