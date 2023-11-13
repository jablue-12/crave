package com.crave.backend.service;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.UserOrder;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.UserOrderRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserOrderRepository userOrderRepository;
    public List<UserDTO> getAccounts() {
        List<UserDTO> users = new ArrayList<>();
        List<Account> accounts = accountRepository.findAll();

        for (Account account : accounts) {
            users.add(UserDTO.of(account));
        }

        return users;
    }

    public Account findByEmail(String email) {
        Account account = accountRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("email " + email + " is not found"));
        return account;
    }

    public List<UserOrder> getUserOrders(Long accountId) {
        List<UserOrder> orders = userOrderRepository.findAllByUserId(accountId);
        return orders;
    }
}
