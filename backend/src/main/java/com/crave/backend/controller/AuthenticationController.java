package com.crave.backend.controller;

<<<<<<< HEAD
<<<<<<< HEAD
import com.crave.backend.dto.UserDTO;
=======
>>>>>>> cc34dbe... Retrieve authenticated user
import com.crave.backend.model.Account;
=======
import com.crave.backend.dto.UserDTO;
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import com.crave.backend.model.auth.AuthenticationRequest;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.AuthenticationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
=======
import org.springframework.security.core.annotation.AuthenticationPrincipal;
>>>>>>> cc34dbe... Retrieve authenticated user
import org.springframework.security.core.userdetails.UserDetails;
=======
import org.springframework.security.core.context.SecurityContextHolder;
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import org.springframework.web.bind.annotation.*;
=======
>>>>>>> abbe86c... Fix backend and frontend issues
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
<<<<<<< HEAD

import static org.springframework.http.ResponseEntity.ok;

import static org.springframework.http.ResponseEntity.ok;
=======
>>>>>>> abbe86c... Fix backend and frontend issues

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping(path = "auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final AccountService accountService;
<<<<<<< HEAD

    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<?> getAuthenticatedUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            // userDetails contains information about the authenticated user
            try {
                Account account = accountService.findByEmail(userDetails.getUsername());
                UserDTO user = UserDTO.of(account);
                return ResponseEntity.ok(user);
            } catch (EntityNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("User is not authenticated.");
    }

=======
>>>>>>> cc34dbe... Retrieve authenticated user

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUser() {
        return ok(accountService.getAccounts().stream()
                .filter(x -> x.getEmail().equals(SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName()))
                .map(UserDTO::of)
                .findFirst()
                .orElse(null));
    }


    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        AuthenticationResponse response = authenticationService.register(request);
        if (response.getToken() != null) {
            return ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticate(request);
        if (response.getToken() != null) {
            return ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
