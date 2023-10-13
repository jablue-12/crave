package com.crave.backend.service;

import com.crave.backend.model.Order;
import com.crave.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Order existingOrder, Order updatedOrder) {

        if (existingOrder != null) {
            existingOrder.setStatus(updatedOrder.getStatus());
            orderRepository.save(existingOrder);
        }

        return existingOrder;
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public Order findById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    public boolean exists(Long id) {
        return orderRepository.findById(id).isPresent();
    }
}
