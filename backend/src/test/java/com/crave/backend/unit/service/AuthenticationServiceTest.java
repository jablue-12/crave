package com.crave.backend.unit.service;

import com.crave.backend.enums.TokenType;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Token;
import com.crave.backend.model.auth.AuthenticationRequest;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.TokenRepository;
import com.crave.backend.service.AuthenticationService;
import com.crave.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationService(accountRepository, tokenRepository, passwordEncoder, jwtService, authenticationManager);
    }

    @Test
    void testRegister_SuccessfulRegistration() {
        // Create a RegisterRequest
        RegisterRequest registerRequest = new RegisterRequest("John", "Doe", "john@example.com", "password", UserRole.USER);

        // Mock the behavior of the accountRepository findByEmail method
        when(accountRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.empty());

        // Mock the behavior of the accountRepository save method
        when(accountRepository.save(any(Account.class))).thenReturn(new Account());

        // Mock the behavior of the jwtService generateToken method
        when(jwtService.generateToken(any(Account.class))).thenReturn("mockedJwtToken");

        // Mock the behavior of the tokenRepository save method
        when(tokenRepository.save(any(Token.class))).thenReturn(new Token());

        // Call the service method
        AuthenticationResponse response = authenticationService.register(registerRequest);

        // Assertions
        assertEquals("mockedJwtToken", response.getToken());
        assertEquals("Successful registration", response.getStatusMessage());
    }
}
