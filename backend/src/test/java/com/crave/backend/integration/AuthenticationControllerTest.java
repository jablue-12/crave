package com.crave.backend.integration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.crave.backend.enums.UserRole;
import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Dish;
import com.crave.backend.model.auth.AuthenticationRequest;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import org.springframework.security.core.userdetails.UserDetails;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.HttpStatus.*;

import org.h2.engine.User;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthenticationControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testGetAuthenticatedUser() {
        // String url = "http://localhost:" + port + "/auth/user";
        
        // UserDetails user;
        // user.
        
        // HttpHeaders headers = new HttpHeaders();
        // headers.set("Content-Type", "application/json");
        
        // HttpEntity<UserDTO> requestEntity = new HttpEntity<>(user, headers);
        // ResponseEntity<UserDTO> response = restTemplate.exchange(
        //         url,
        //         HttpMethod.GET,
        //         requestEntity,
        //         UserDTO.class
        // );
        // assertEquals(OK, response.getStatusCode());
    }

    @Test
    public void testRegister() {
        String url = "http://localhost:" + port + "/auth/register";
        RegisterRequest registerRequest = new RegisterRequest("testuser", "password123", "testuser@example.com", "Test User",UserRole.USER);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");


        HttpEntity<RegisterRequest> requestEntity = new HttpEntity<>(registerRequest, headers);
        ResponseEntity<AuthenticationResponse> response = restTemplate.postForEntity(url, requestEntity, AuthenticationResponse.class);

        assertEquals(OK, response.getStatusCode());
    }

    @Test
    public void testAuthenticate() {
        // String url = "http://localhost:" + port + "/auth/login";
        // AuthenticationRequest authenticationRequest = new AuthenticationRequest("userdemo@gmail.com", "demo");

        // HttpHeaders headers = new HttpHeaders();
        // headers.set("Content-Type", "application/json");

        // HttpEntity<AuthenticationRequest> requestEntity = new HttpEntity<>(authenticationRequest, headers);
        // ResponseEntity<AuthenticationResponse> response = restTemplate.postForEntity(url, requestEntity, AuthenticationResponse.class);

        // assertEquals(OK, response.getStatusCode());
    }
}
