package com.crave.backend.unit;

import com.crave.backend.enums.TokenType;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Token;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TokenTest {
    private Account user;
    private Token token;

    @BeforeEach
    public void setUp() {
        user = Account.builder()
                .id(1l)
                .firstName("Dushane")
                .lastName("Hill")
                .email("dhill@gmail.co.uk")
                .password("idkruhfaminnit")
                .userRole(UserRole.USER)
                .build();

        token = Token.builder()
                .id(1L)
                .token("sadsafaasdasdsadsadsadasdasda")
                .revoked(false)
                .expired(false)
                .tokenType(TokenType.BEARER)
                .user(user)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, token.getId());
        assertEquals("sadsafaasdasdsadsadsadasdasda", token.getToken());
        assertFalse(token.isRevoked());
        assertFalse(token.isExpired());
        assertEquals(TokenType.BEARER, token.getTokenType());
        assertNotNull(token.getUser());
    }

    @Test
    void testSetters() {
        token.setId(2L);
        token.setToken("abcdefghijklmnopqrstuvwxyz");
        token.setRevoked(true);
        token.setExpired(true);

        assertEquals(2L, token.getId());
        assertEquals("abcdefghijklmnopqrstuvwxyz", token.getToken());
        assertTrue(token.isRevoked());
        assertTrue(token.isExpired());
    }
}
