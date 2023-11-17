package com.crave.backend.controller;

import lombok.Builder;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

@RestController
@RequestMapping(path = "orders")
public class OrderController {
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
    }
}
