package com.crave.backend.service;

import com.crave.backend.model.OrderItem;
import com.crave.backend.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItem> getOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    public List<OrderItem> getOrderItemsByOrder(Long orderId) {
        return orderItemRepository.findAllByOrderId(orderId);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(OrderItem existingOrderItem, OrderItem updatedOrderItem) {

        if (existingOrderItem != null) {
            existingOrderItem.setName(updatedOrderItem.getName());
            existingOrderItem.setPrice(updatedOrderItem.getPrice());
            
            orderItemRepository.save(existingOrderItem);
        }

        return existingOrderItem;
    }

    public void deleteOrderItemById(Long id) {
        orderItemRepository.deleteById(id);
    }

    public OrderItem findById(Long id) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(id);
        return orderItem.orElse(null);
    }

    public boolean exists(Long id) {
        return orderItemRepository.findById(id).isPresent();
    }
}
