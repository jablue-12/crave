package com.crave.backend.unit;

import com.crave.backend.dto.UserDTO;
import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserDTOTest {
    private Account account;
    private UserDTO userDto;

    @BeforeEach
    public void setUp() {
        account = Account.builder()
                .id(1l)
                .firstName("Dushane")
                .lastName("Hill")
                .email("dhill@gmail.co.uk")
                .password("idkruhfaminnit")
                .userRole(UserRole.USER)
                .build();

        userDto = UserDTO.of(account);
    }

    @Test
    void testGetters() {
        assertEquals("Dushane", userDto.firstName());
        assertEquals("Hill", userDto.lastName());
        assertEquals("dhill@gmail.co.uk", userDto.email());
        assertEquals(UserRole.USER, userDto.userRole());
    }
}
