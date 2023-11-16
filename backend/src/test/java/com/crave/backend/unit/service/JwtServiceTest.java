package com.crave.backend.unit.service;

import io.jsonwebtoken.Claims;
import com.crave.backend.service.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    @Test
    void testExtractUsername() {
        String token = "jwt..token";
        String username = jwtService.extractUsername(token);
        assertNotNull(username);
    }

    @Test
    void testExtractClaim() {
        String token = "jwt..token";
        String subject = jwtService.extractClaim(token, Claims::getSubject);
        assertNotNull(subject);
    }

    @Test
    void testIsTokenValid() {
        String token = "jwt..token";
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("testUser");
        boolean isValid = jwtService.isTokenValid(token, userDetails);
        assertTrue(isValid);
    }


    @Test
    void testGenerateToken() {
        UserDetails userDetails = new User("testUser", "password", new ArrayList<>());
        String generatedToken = jwtService.generateToken(userDetails);
        // Add assertions based on your expectations
        assertNotNull(generatedToken);
    }

    @Test
    void testGenerateTokenWithExtraClaims() {
        UserDetails userDetails = new User("testUser", "password", new ArrayList<>());
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("customClaim", "customValue");
        String generatedToken = jwtService.generateToken(extraClaims, userDetails);
        // Add assertions based on your expectations
        assertNotNull(generatedToken);
    }


}
