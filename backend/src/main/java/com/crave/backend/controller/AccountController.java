package com.crave.backend.controller;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    public List<UserDTO> getAccounts() {
        return accountService.getAccounts();
    }

    @GetMapping(path="/orders/{id}")
    public List<UserOrder> getOrders(@PathVariable Long id) {
        return accountService.getUserOrders(id);
    }
}
