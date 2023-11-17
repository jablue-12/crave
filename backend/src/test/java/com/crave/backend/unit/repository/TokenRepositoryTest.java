package com.crave.backend.unit.repository;

import com.crave.backend.enums.TokenType;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Token;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.TokenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class TokenRepositoryTest {
    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    public void setUp() {
        Account account = Account.builder()
                .firstName("John")
                .lastName("Doe")
                .email("johndoe@gmail.com")
                .password("mypassword")
                .userRole(UserRole.USER)
                .build();

        accountRepository.save(account);

        Token token = Token.builder()
                .token("abcdefg123456")
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .user(account)
                .build();

        tokenRepository.save(token);
    }

    @Test
    void testFindAllValidTokenByUser() {
        Account user = accountRepository.findByEmail("johndoe@gmail.com").orElse(null);
        assertNotNull(user);

        List<Token> validTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        assertEquals(1, validTokens.size());
    }

    @Test
    void testFindByToken() {
        Token token = tokenRepository.findByToken("abcdefg123456").orElse(null);
        assertNotNull(token);
    }
}
