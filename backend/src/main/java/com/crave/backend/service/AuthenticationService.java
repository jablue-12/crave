package com.crave.backend.service;

import com.crave.backend.enums.TokenType;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Token;
import com.crave.backend.model.auth.AuthenticationRequest;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthenticationService {
    private static final String SUCCESS_REGISTRATION_MSG = "Successful registration";
    private static final String FAILURE_REGISTRATION_MSG = "Failed registration. Email is not available.";
    private static final String SUCCESS_LOGIN_MSG = "Successful login";
    private final AccountRepository accountRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Account existingAccount = accountRepository.findByEmail(request.getEmail()).orElse(null);

        if (existingAccount != null) {
            return AuthenticationResponse.builder().token(null).statusMessage(FAILURE_REGISTRATION_MSG).build();
        }

        Account user = Account.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
<<<<<<< HEAD
                .userRole(isValidUserRole(request) ? request.getUserRole() : UserRole.USER)
=======
                .userRole(request.getUserRole())
>>>>>>> aa627c3... Include UserRole
                .build();

        var savedUser = accountRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponse.builder().token(jwtToken).statusMessage(SUCCESS_REGISTRATION_MSG).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            // Exception will be thrown when this fails (user or pass is not correct)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // User is authenticated, find the user from db
            Account user = accountRepository.findByEmail(request.getEmail()).orElseThrow();
            var jwtToken = jwtService.generateToken(user);

            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);

            return AuthenticationResponse.builder().token(jwtToken).statusMessage(SUCCESS_LOGIN_MSG).build();
        } catch (Exception e) {
            return AuthenticationResponse.builder().token(null).statusMessage(e.getMessage()).build();
        }

    }

    private boolean isValidUserRole(RegisterRequest request) {
        return request.getUserRole() == UserRole.USER || request.getUserRole() == UserRole.ADMIN;
    }

    private void saveUserToken(Account user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Account user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
