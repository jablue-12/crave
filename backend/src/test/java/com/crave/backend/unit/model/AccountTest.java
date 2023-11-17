package com.crave.backend.unit.model;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AccountTest {
    private Account user;

    @BeforeEach
    public void setUp() {
        user = Account.builder()
                .id(1l)
                .firstName("Dushane")
                .lastName("Hill")
                .email("dhill@gmail.co.uk")
                .password("idkruhfaminnit")
                .userRole(UserRole.USER)
                .build();
    }

    @Test
    void testGetters() {
        assertEquals(1L, user.getId());
        assertEquals("Dushane", user.getFirstName());
        assertEquals("Hill", user.getLastName());
        assertEquals("dhill@gmail.co.uk", user.getEmail());
        assertEquals("idkruhfaminnit", user.getPassword());
        assertEquals("dhill@gmail.co.uk", user.getUsername());
        assertEquals(UserRole.USER, user.getUserRole());
        assertNull(user.getComments());
        assertNull(user.getTokens());

        // Override methods that are not used
        assertEquals(1, user.getAuthorities().size());
        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }

    @Test
    void testSetters() {
        user.setId(2L);
        user.setFirstName("Gerrard");
        user.setLastName("Sullivan");
        user.setEmail("sully.gerrard@yahoo.co.uk");
        user.setPassword("icanneverbefood");
        user.setUserRole(UserRole.ADMIN);

        assertEquals(2L, user.getId());
        assertEquals("Gerrard", user.getFirstName());
        assertEquals("Sullivan", user.getLastName());
        assertEquals("sully.gerrard@yahoo.co.uk", user.getEmail());
        assertEquals("icanneverbefood", user.getPassword());
        assertEquals(UserRole.ADMIN, user.getUserRole());
    }
}
