package com.crave.backend.dto;

<<<<<<< HEAD
import com.crave.backend.enums.UserRole;
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import com.crave.backend.model.Account;
import lombok.Builder;

@Builder
<<<<<<< HEAD
public record UserDTO(String firstName, String lastName, String email, UserRole userRole) {
=======
public record UserDTO(String firstName, String lastName, String email) {
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
    public static UserDTO of(Account account) {
        return UserDTO.builder()
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .email(account.getEmail())
<<<<<<< HEAD
                .userRole(account.getUserRole())
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
                .build();
    }
}
