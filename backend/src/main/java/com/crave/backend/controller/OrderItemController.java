package com.crave.backend.controller;

import com.crave.backend.model.OrderItem;
import com.crave.backend.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "orderitems")
public class OrderItemController {
    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public List<OrderItem> getOrderItems() {
        return orderItemService.getOrderItems();
    }

    @GetMapping(path = "/{id}")
    public Optional<OrderItem> getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }

    @PostMapping
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
        OrderItem newOrderItem = orderItemService.createOrderItem(orderItem);
        return new ResponseEntity<>(newOrderItem, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable Long id, @RequestBody OrderItem updatedOrderItem) {
        OrderItem existingOrderItem = orderItemService.findById(id);

        if (existingOrderItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        OrderItem updated = orderItemService.updateOrderItem(existingOrderItem, updatedOrderItem);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable Long id) {
        if (!orderItemService.exists(id)) {
            return new ResponseEntity<>("OrderItem not found", HttpStatus.NOT_FOUND);
        }

        orderItemService.deleteOrderItemById(id);
        return new ResponseEntity<>("OrderItem deleted successfully", HttpStatus.NO_CONTENT);
    }

}
