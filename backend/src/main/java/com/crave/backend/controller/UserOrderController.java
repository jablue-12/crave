package com.crave.backend.controller;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.UserOrderService;
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
@RequestMapping(path = "userorders")
@RequiredArgsConstructor
public class UserOrderController {
    private final UserOrderService userOrderService;
    private final AccountService accountService;

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

    @GetMapping(path = "/restaurants/{restaurantId}")
    public List<UserOrder> getOrdersByRestaurantId(@PathVariable Long restaurantId) {
        return userOrderService.getOrdersByRestaurantId(restaurantId);
    }

    @GetMapping(path = "/accounts/{accountId}")
    public List<UserOrder> getOrdersByAccountId(@PathVariable Long accountId) {
        return userOrderService.getOrdersByAccountId(accountId);
    }

    @PostMapping
    public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrder userOrder) {
        System.out.println(userOrder.toString());
        UserOrder newUserOrder = userOrderService.createOrder(userOrder);
        return new ResponseEntity<>(newUserOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserOrder> updateOrder(@PathVariable Long id, @RequestBody UserOrder updatedUserOrder) {
        UserOrder existingUserOrder = userOrderService.findById(id);

        if (existingUserOrder == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserOrder updated = userOrderService.updateOrder(updatedUserOrder);
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
