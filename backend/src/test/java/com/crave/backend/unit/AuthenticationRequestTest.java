package com.crave.backend.unit;

import com.crave.backend.model.auth.AuthenticationRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class AuthenticationRequestTest {
    private AuthenticationRequest authenticationRequest1;
    private AuthenticationRequest authenticationRequest2;

    @BeforeEach
    public void setUp() {
        authenticationRequest1 = AuthenticationRequest.builder()
                .email("userdemo@gmail.com")
                .password("demo")
                .build();

        authenticationRequest2 = new AuthenticationRequest();
    }

    @Test
    void testGetters() {
        assertEquals("userdemo@gmail.com", authenticationRequest1.getEmail());
        assertEquals("demo", authenticationRequest1.getPassword());

        assertNull(authenticationRequest2.getEmail());
        assertNull(authenticationRequest2.getPassword());
    }

    @Test
    void testSetters() {
        authenticationRequest1.setEmail("admindemo@gmail.com");
        authenticationRequest1.setPassword("admindemo");

        assertEquals("admindemo@gmail.com", authenticationRequest1.getEmail());
        assertEquals("admindemo", authenticationRequest1.getPassword());
    }
}
