package com.crave.backend.controller;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.model.OrderItem;
import com.crave.backend.model.Dish;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.UserOrderService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.crave.backend.service.OrderItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping(path = "userOrders")
@RequiredArgsConstructor
public class UserOrderController {
    private final UserOrderService userOrderService;
    private final AccountService accountService;
    private final OrderItemService orderItemService;
    @GetMapping
    @ResponseBody
    public ResponseEntity<?> getOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            // userDetails contains information about the authenticated user
            try {
                Account account = accountService.findByEmail(userDetails.getUsername());
                UserDTO user = UserDTO.of(account);
                return ResponseEntity.ok(user);
            } catch (EntityNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("Unable to get the orders since user is not authenticated.");
    }

    @GetMapping(path = "/{id}")
    public Optional<UserOrder> getOrderById(@PathVariable Long id) {
        return userOrderService.getOrderById(id);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> requestBody) {
        Map<String, Object> orderMap = (Map<String, Object>) requestBody.get("orderInfo");
        UserOrder orderInfo = mapToOrder(orderMap);

        List<Map<String, Object>> orderItemsMaps = (List<Map<String, Object>>) requestBody.get("orderItems");
        List<OrderItem> orderItems = orderItemsMaps.stream()
                .map(this::mapToOrderItem)
                .collect(Collectors.toList());
        
        try {
                Account account = accountService.findByEmail(orderInfo.getEmail());
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        
        UserOrder newUserOrder = userOrderService.createOrder(orderInfo);
        for (OrderItem orderItem : orderItems){
            orderItem.setOrder_id(newUserOrder.getId());
            orderItemService.createOrderItem(orderItem);
        }
        return new ResponseEntity<>(newUserOrder, HttpStatus.CREATED);

    }

    private UserOrder mapToOrder(Map<String, Object> orderMap) {
        UserOrder order = new UserOrder((String)orderMap.get("email"), (String)orderMap.get("placedAt"));
        return order;
    }

    private OrderItem mapToOrderItem(Map<String, Object> orderItemMap) {   
        long dishId = (int)orderItemMap.get("dish_id");
        long quantity =(int)orderItemMap.get("quantity");
        
        OrderItem orderItem = new OrderItem(-1L, dishId, quantity);
        return orderItem;
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserOrder> updateOrder(@PathVariable Long id, @RequestBody UserOrder updatedUserOrder) {
        UserOrder existingUserOrder = userOrderService.findById(id);

        if (existingUserOrder == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserOrder updated = userOrderService.updateOrder(existingUserOrder, updatedUserOrder);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (!userOrderService.exists(id)) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }

        userOrderService.deleteOrderById(id);
        return new ResponseEntity<>("Order deleted successfully", HttpStatus.NO_CONTENT);
    }

}
