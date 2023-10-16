package com.crave.backend.controller;

import com.crave.backend.model.Login;
import com.crave.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping(path = "login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping
    public List<Login> getLogins() {
        return loginService.getLogins();
    }

    @GetMapping(path = "/{id}")
    public Optional<Login> getLoginById(@PathVariable String id) {
        return loginService.getLoginById(id);
    }


    @PostMapping
    public ResponseEntity<Login> createLogin(@RequestBody Login login) {
        Login existingLogin = loginService.findById(login.getId());
        if (existingLogin != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Login newLogin = loginService.createLogin(login);
        return new ResponseEntity<>(newLogin, HttpStatus.CREATED);
       
    }

    @PutMapping("/{id}")
    public ResponseEntity<Login> updateLogin(@PathVariable String id, @RequestBody Login updatedLogin) {
        Login existingLogin = loginService.findById(id);

        if (existingLogin == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Login updated = loginService.updateLogin(existingLogin, updatedLogin);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLogin(@PathVariable String id) {
        if (!loginService.exists(id)) {
            return new ResponseEntity<>("Login not found", HttpStatus.NOT_FOUND);
        }

        loginService.deleteLoginById(id);
        return new ResponseEntity<>("Login deleted successfully", HttpStatus.NO_CONTENT);
    }

}
