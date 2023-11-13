package com.crave.backend.service;

import com.crave.backend.model.UserOrder;
import com.crave.backend.model.OrderItem;
import com.crave.backend.repository.OrderItemRepository;
import com.crave.backend.repository.UserOrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserOrderService {
    private final UserOrderRepository userOrderRepository;
    private final OrderItemRepository orderItemRepository;
   

    public List<UserOrder> getOrders() {
        return userOrderRepository.findAll();
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

    public UserOrder addOrderItemById(UserOrder updatedUserOrder, Long restaurantItemId) {
        if (!orderItemRepository.existsById(restaurantItemId)) {
            return updatedUserOrder;
        }
        
        OrderItem newItem = orderItemRepository.findById(restaurantItemId).orElse(null);
        updatedUserOrder.getOrderItems().add(newItem);
        userOrderRepository.save(updatedUserOrder);
        return updatedUserOrder;
    }

    public UserOrder addOrderItemsById(UserOrder updatedUserOrder, List<Long> restaurantItemIds) {
        for (Long restaurantItemId : restaurantItemIds) {
            if (!orderItemRepository.existsById(restaurantItemId)) {
                return updatedUserOrder;
            }
        }

        List <OrderItem> newItems = orderItemRepository.findAllById(restaurantItemIds);
        updatedUserOrder.getOrderItems().addAll(newItems);
        userOrderRepository.save(updatedUserOrder);
        return updatedUserOrder;
    }

    public UserOrder addOrderItem(UserOrder updatedUserOrder, OrderItem restaurantItem) {
        orderItemRepository.save(restaurantItem);
        updatedUserOrder.getOrderItems().add(restaurantItem);
        userOrderRepository.save(updatedUserOrder);
        return updatedUserOrder;
    }

    public UserOrder addOrderItems(UserOrder updatedUserOrder, List<OrderItem> restaurantItems) {
        orderItemRepository.saveAll(restaurantItems);
        updatedUserOrder.getOrderItems().addAll(restaurantItems);
        userOrderRepository.save(updatedUserOrder);
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
