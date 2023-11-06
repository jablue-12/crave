package com.crave.backend.unit;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class AccountRepositoryTest {

    @Autowired
    private AccountRepository accountRepository;

    @Test
    void testFindByEmailWhereAccountExists() {
        Account account = Account.builder()
                .id(1l)
                .firstName("John")
                .lastName("Doe")
                .email("johndoe@gmail.com")
                .password("mypassword")
                .userRole(UserRole.USER)
                .build();

        accountRepository.save(account);

        Account actual = accountRepository.findByEmail(account.getEmail()).orElse(null);

        assertEquals(account.getId(), actual.getId());
        assertEquals(account.getFirstName(), actual.getFirstName());
        assertEquals(account.getLastName(), actual.getLastName());
        assertEquals(account.getEmail(), actual.getEmail());
        assertEquals(account.getPassword(), actual.getPassword());
        assertEquals(account.getUserRole(), actual.getUserRole());
    }

    @Test
    void testFindByEmailWhereAccountDoesNotExist() {
        Account actual = accountRepository.findByEmail("unknown@gmail.com").orElse(null);

        assertNull(actual);
    }
}
