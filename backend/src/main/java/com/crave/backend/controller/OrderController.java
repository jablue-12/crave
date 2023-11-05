package com.crave.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "orders")
public class OrderController {
    public record Order(int id, String placedAt) {
    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping()
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        // Process the order, save it to the database, etc.
        // You can return an appropriate response, such as a success message or order ID.
        System.out.println(order);
        // Send a notification to the admin
        messagingTemplate.convertAndSend("/topic/orders", order);

        return ResponseEntity.ok("Order " + order.id + "Placed");
    }
}
