package com.crave.backend.service;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

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
}
