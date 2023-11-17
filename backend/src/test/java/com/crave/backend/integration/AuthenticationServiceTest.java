package com.crave.backend.integration;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
public class AuthenticationServiceTest {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private AccountService accountService;

    @Test
    public void testRegister() {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .firstName("Software")
                .lastName("Engineer")
                .email("softeng@gmail.com")
                .password("4350")
                .userRole(UserRole.ADMIN)
                .build();

        AuthenticationResponse registerResponse = authenticationService.register(registerRequest);
        assertEquals("Successful registration", registerResponse.getStatusMessage());
        assertNotNull(registerResponse.getToken());

        Account createdAccount = accountService.findByEmail("softeng@gmail.com");
        assertNotNull(createdAccount);
    }
}
