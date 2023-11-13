package com.crave.backend.service;

import com.crave.backend.model.OrderItem;
import com.crave.backend.model.UserOrder;

import com.crave.backend.repository.OrderItemRepository;
import com.crave.backend.repository.UserOrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final UserOrderRepository userOrderRepository;
    

    public List<OrderItem> getOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        List<OrderItem> restaurantItems = orderItemRepository.findAllByOrderId(orderId);
        return restaurantItems;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        UserOrder theOrder = userOrderRepository.findById(orderItem.getOrderId()).orElse(null);
        if(theOrder == null){
            return null;
        }
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(OrderItem updatedOrderItem) {
        if (exists(updatedOrderItem.getId())) {            
            orderItemRepository.save(updatedOrderItem);
        }
        return updatedOrderItem;
    }

    public void deleteOrderItemById(Long id) {
        orderItemRepository.deleteById(id);
    }

    public void deleteOrderItemByOrderId(Long orderId) {
        orderItemRepository.deleteByOrderId(orderId);
    }

    public OrderItem findById(Long id) {
        Optional<OrderItem> orderItem = orderItemRepository.findById(id);
        return orderItem.orElse(null);
    }

    public boolean exists(Long id) {
        return orderItemRepository.findById(id).isPresent();
    }
}
