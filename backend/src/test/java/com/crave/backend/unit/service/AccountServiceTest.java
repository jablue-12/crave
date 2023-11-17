package com.crave.backend.unit.service;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.service.AccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {
    @Mock
    private AccountRepository accountRepository;
    private AccountService accountService;

    @BeforeEach
    void setUp() {
        accountService = new AccountService(accountRepository);
    }

    @Test
    void testGetAccounts() {
        // Create a list of accounts for testing
        List<Account> accounts = new ArrayList<>();
        accounts.add(new Account());
        accounts.add(new Account());

        // Mock the behavior of the repository findAll method
        when(accountRepository.findAll()).thenReturn(accounts);

        // Call the service method
        List<UserDTO> retrievedUsers = accountService.getAccounts();

        // Assertions
        assertEquals(2, retrievedUsers.size());
        // You may add more assertions based on your DTO conversion logic
    }

    @Test
    void testFindByEmail() {
        // Create an account
        String email = "test@example.com";
        Account account = new Account();
        account.setEmail(email);

        // Mock the behavior of the repository findByEmail method
        when(accountRepository.findByEmail(email)).thenReturn(Optional.of(account));

        // Call the service method
        Account retrievedAccount = accountService.findByEmail(email);

        // Assertions
        assertEquals(account, retrievedAccount);
    }

    // Add more test methods based on your service class functionality
    // You may want to test other methods like findById, save, update, delete, etc.
}