package com.crave.backend.controller;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.model.Account;
import com.crave.backend.model.auth.AuthenticationRequest;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping(path = "auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final AccountService accountService;

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
