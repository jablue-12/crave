package com.crave.backend.unit.service;

import com.crave.backend.repository.TokenRepository;
import com.crave.backend.service.LogoutService;
import com.crave.backend.model.Token;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LogoutServiceTest {

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private LogoutService logoutService;

    @Test
    void testLogoutWithValidToken() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Authentication authentication = mock(Authentication.class);

        Token token = new Token();
        token.setToken("sometokenidk");
        // Mock the request method
        when(request.getMethod()).thenReturn("POST");

        // Mock the Authorization header
        when(request.getHeader("Authorization")).thenReturn("Bearer sometokenidk");

        // Mock the behavior of the token repository
        when(tokenRepository.findByToken("sometokenidk")).thenReturn(Optional.of(token));

        // Call the logout method
        logoutService.logout(request, response, authentication);

        // Verify that the token is marked as expired and revoked
        verify(tokenRepository).save(token);
    }

    @Test
    void testLogoutWithInvalidToken() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Authentication authentication = mock(Authentication.class);

        // Mock the request method
        when(request.getMethod()).thenReturn("POST");

        // Mock the Authorization header with an invalid format
        when(request.getHeader("Authorization")).thenReturn("InvalidTokenFormat");

        // Call the logout method
        logoutService.logout(request, response, authentication);

        // Verify that the token repository is not called
        verify(tokenRepository, never()).findByToken(anyString());

        // Verify that SecurityContextHolder is not cleared
        verify(authentication, never()).setAuthenticated(false);
    }

    @Test
    void testLogoutWithNonPostRequest() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Authentication authentication = mock(Authentication.class);

        // Mock a non-POST request method
        when(request.getMethod()).thenReturn("GET");

        // Call the logout method
        logoutService.logout(request, response, authentication);

        // Verify that the token repository is not called
        verify(tokenRepository, never()).findByToken(anyString());

        // Verify that SecurityContextHolder is not cleared
        verify(authentication, never()).setAuthenticated(false);
    }
}
