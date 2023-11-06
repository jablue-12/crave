package com.crave.backend.controller;

import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.UserOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "userOrders")
@RequiredArgsConstructor
public class UserOrderController {
    private final UserOrderService userOrderService;
    private final AccountService accountService;

//    // Need DB relationship between UserOrder and Account
//    @GetMapping
//    public List<UserOrder> getOrders() {
//        return userOrderService.getOrders();
//    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<?> getOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            // userDetails contains information about the authenticated user
            Account user = accountService.findByEmail(userDetails.getUsername()).orElse(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body("Unable to get the orders since user is not authenticated.");
    }

    @GetMapping(path = "/{id}")
    public Optional<UserOrder> getOrderById(@PathVariable Long id) {
        return userOrderService.getOrderById(id);
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
