package com.crave.backend.controller;

<<<<<<< HEAD
<<<<<<< HEAD
import lombok.Builder;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> abbe86c... Fix backend and frontend issues
=======
import lombok.Builder;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;
>>>>>>> efb3522... Add order controller and webhook

@RestController
@RequestMapping(path = "orders")
public class OrderController {
<<<<<<< HEAD
<<<<<<< HEAD
    @Builder
    public record OrderItem(int id, String name, double price, String tag) {
    }

    @Builder
    public record OrderInfo(String placedAt, String username, String email, String role) {
    }

    @Builder
    public record Order(OrderInfo orderInfo, List<OrderItem> orderItems) {

    }

    @GetMapping()
    public ResponseEntity<List<Order>> getOrders() {
        return ResponseEntity.ok(
                IntStream.range(1, 6).mapToObj(i -> Order.builder()
                                .orderInfo(
                                        OrderInfo.builder()
                                                .placedAt(LocalDateTime.now().toString())
                                                .username("Firstname Lastname")
                                                .email("test@gmail.com")
                                                .build())
                                .orderItems(List.of(
                                        OrderItem.builder()
                                                .id(1)
                                                .name("Test Order Item 1")
                                                .price(12.5)
                                                .build(),
                                        OrderItem.builder()
                                                .id(2)
                                                .name("Test Order Item 2")
                                                .price(12.5)
                                                .build(),
                                        OrderItem.builder()
                                                .id(3)
                                                .name("Test Order Item 3")
                                                .price(12.5)
                                                .build()
                                )).build())
                        .toList());
    }

    @PostMapping()
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        System.out.println("Logging - placeOrder()");
        System.out.println(order);
        System.out.println("Collecting order info");
        return ResponseEntity.ok("Order for " + order.orderInfo.username + " - Placed");
=======
    public record Order(int id, String placedAt) {
=======
    @Builder
    public record OrderItem(int id, String name, double price, int restaurantId, String restaurantName) {
    }

    @Builder
    public record OrderInfo(int id, String placedAt, String username, String email) {
    }

    public record OrderPlaced(String content, OrderInfo orderInfo) {
>>>>>>> efb3522... Add order controller and webhook
    }

    @Builder
    public record Order(OrderInfo orderInfo, List<OrderItem> orderItems) {

    }

    @GetMapping()
    public ResponseEntity<List<Order>> getOrders() {
        return ResponseEntity.ok(
                IntStream.range(1, 6).mapToObj(i -> Order.builder()
                                .orderInfo(
                                        OrderInfo.builder()
                                                .id(i)
                                                .placedAt(LocalDateTime.now().toString())
                                                .username("Firstname Lastname")
                                                .email("test@gmail.com")
                                                .build())
                                .orderItems(List.of(
                                        OrderItem.builder()
                                                .id(1)
                                                .name("Test Order Item 1")
                                                .price(12.5)
                                                .restaurantId(1)
                                                .restaurantName("Test Restaurant")
                                                .build(),
                                        OrderItem.builder()
                                                .id(2)
                                                .name("Test Order Item 2")
                                                .price(12.5)
                                                .restaurantId(2)
                                                .restaurantName("Test Restaurant")
                                                .build(),
                                        OrderItem.builder()
                                                .id(3)
                                                .name("Test Order Item 3")
                                                .price(12.5)
                                                .restaurantId(1)
                                                .restaurantName("Test Restaurant")
                                                .build()
                                )).build())
                        .toList());
    }

    @PostMapping()
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        System.out.println("Logging - placeOrder()");
        System.out.println(order);
        System.out.println("Collecting order info");
        return ResponseEntity.ok("Order - " + order.orderInfo.id + " - Placed");
    }

<<<<<<< HEAD
        return ResponseEntity.ok("Order " + order.id + "Placed");
>>>>>>> abbe86c... Fix backend and frontend issues
=======
    @MessageMapping("/orderPlaced")
    @SendTo("/topic/notifications")
    public OrderPlaced notifyOrderPlaced(@Payload OrderPlaced orderPlaced) {
        System.out.println("LA LA LA");
        return orderPlaced;
>>>>>>> efb3522... Add order controller and webhook
    }
}
