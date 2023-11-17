package com.crave.backend.dto;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import lombok.Builder;

@Builder
public record UserDTO(String firstName, String lastName, String email, UserRole userRole) {
    public static UserDTO of(Account account) {
        return UserDTO.builder()
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .email(account.getEmail())
                .userRole(account.getUserRole())
                .build();
    }
}
