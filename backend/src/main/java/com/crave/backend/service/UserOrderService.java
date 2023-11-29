package com.crave.backend.service;

import com.crave.backend.model.UserOrder;
import com.crave.backend.repository.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserOrderService {
    private final UserOrderRepository userOrderRepository;

    @Autowired
    public UserOrderService(UserOrderRepository userOrderRepository) {
        this.userOrderRepository = userOrderRepository;
    }

    public List<UserOrder> getOrders() {
        return userOrderRepository.findAll();
    }

    public Optional<UserOrder> getOrderById(Long id) {
        return userOrderRepository.findById(id);
    }

    public List<UserOrder> getOrdersByEmail(String email) {
        return userOrderRepository.findByEmail(email);
    }

    public UserOrder createOrder(UserOrder userOrder) {
        return userOrderRepository.save(userOrder);
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
