package com.crave.backend.controller;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.OrderItem;
import com.crave.backend.model.UserOrder;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.OrderItemService;
import com.crave.backend.service.UserOrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
                Account user = accountService.findByEmail(userDetails.getUsername());
                if (user.getUserRole() == UserRole.USER) {
                    return new ResponseEntity<>(userOrderService.getOrdersByEmail(userDetails.getUsername()), HttpStatus.OK);
                }
            } catch (EntityNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return new ResponseEntity<>("The account is not authenticated.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/getByUser/{email}")
    public ResponseEntity<?> getOrders(@PathVariable String email) {
        System.out.println("got here");
        System.out.println(email);
        if (email != null) {
            // userDetails contains information about the authenticated user
            try {
                Account account = accountService.findByEmail(email);
                // UserDTO user = UserDTO.of(account);
                // return ResponseEntity.ok(user);
            } catch (EntityNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        return new ResponseEntity<>(userOrderService.getOrdersByEmail(email), HttpStatus.OK);
    }


    @GetMapping(path = "/{id}")
    public Optional<UserOrder> getOrderById(@PathVariable Long id) {
        return userOrderService.getOrderById(id);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> requestBody) {
        if (userDetails == null) {
            return new ResponseEntity<>("The account is not authenticated.", HttpStatus.BAD_REQUEST);
        }

        Map<String, Object> orderMap = (Map<String, Object>) requestBody.get("orderInfo");
        UserOrder orderInfo = mapToOrder(orderMap);

        List<Map<String, Object>> orderItemsMaps = (List<Map<String, Object>>) requestBody.get("orderItems");
        List<OrderItem> orderItems = orderItemsMaps.stream()
                .map(this::mapToOrderItem)
                .collect(Collectors.toList());

        UserOrder newUserOrder = userOrderService.createOrder(orderInfo);
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrderId(newUserOrder.getId());
            orderItemService.createOrderItem(orderItem);
        }

        return new ResponseEntity<>(newUserOrder, HttpStatus.CREATED);
    }

    private UserOrder mapToOrder(Map<String, Object> orderMap) {
        String email = (String) orderMap.get("email");
        String placedAt = (String) orderMap.get("placedAt");
        Float total = ((Number) orderMap.get("total")).floatValue();

        UserOrder order = new UserOrder(email, placedAt, total);
        return order;
    }

    private OrderItem mapToOrderItem(Map<String, Object> orderItemMap) {
        long dishId = (int) orderItemMap.get("dish_id");
        long quantity = (int) orderItemMap.get("quantity");
        float price = ((Number) orderItemMap.get("price")).floatValue();

        OrderItem orderItem = new OrderItem(-1L, dishId, quantity, price);
        return orderItem;
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
