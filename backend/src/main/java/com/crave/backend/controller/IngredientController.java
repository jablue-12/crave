package com.crave.backend.controller;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import com.crave.backend.model.Ingredient;
import com.crave.backend.service.AccountService;
import com.crave.backend.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> getIngredients() {
        return ok(ingredientService.getIngredients());
    }

    @PostMapping
    public ResponseEntity<?> createIngredient(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Ingredient ingredient) {

        if (userDetails != null) {
            Account admin = accountService.findByEmail(userDetails.getUsername());

            if (admin.getUserRole() == UserRole.ADMIN) {
                try {
                    Ingredient newIngredient = ingredientService.createIngredient(ingredient);
                    return new ResponseEntity<>(newIngredient, HttpStatus.CREATED);
                } catch (IllegalArgumentException e) {
                    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
                }
            }
        }
        return new ResponseEntity<>("The account that is trying to add an ingredient is not an admin.", HttpStatus.BAD_REQUEST);

    }
}
