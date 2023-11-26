package com.crave.backend.controller;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.model.OrderItem;
import com.crave.backend.model.Dish;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.UserOrderService;
import com.crave.backend.service.OrderItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    // @PostMapping
    // public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrder userOrder) {
    //     System.out.println(userOrder.toString());
    //     UserOrder newUserOrder = userOrderService.createOrder(userOrder);
    //     return new ResponseEntity<>(newUserOrder, HttpStatus.CREATED);

    // }

    @PostMapping
    public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrder orderInfo, List<Dish> orderItems) {
        UserOrder newUserOrder = userOrderService.createOrder(orderInfo);
        for (Dish orderitem : orderItems){
            OrderItem newOrderItem = new OrderItem(newUserOrder.getId(), );
        }

        return new ResponseEntity<>(newUserOrder, HttpStatus.CREATED);

    }
//OrderItem(Long id, Long order_id, Long dish_id, int quantity, String name, float price)

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
