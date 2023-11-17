package com.crave.backend.unit.model;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.auth.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class RegisterRequestTest {
    private RegisterRequest registerRequest1;
    private RegisterRequest registerRequest2;

    @BeforeEach
    public void setUp() {
        registerRequest1 = RegisterRequest.builder()
                .firstName("User")
                .lastName("Test")
                .email("userdemo@gmail.com")
                .password("demo")
                .userRole(UserRole.USER)
                .build();

        registerRequest2 = new RegisterRequest();
    }

    @Test
    void testGetters() {
        assertEquals("User", registerRequest1.getFirstName());
        assertEquals("Test", registerRequest1.getLastName());
        assertEquals("userdemo@gmail.com", registerRequest1.getEmail());
        assertEquals("demo", registerRequest1.getPassword());
        assertEquals(UserRole.USER, registerRequest1.getUserRole());

        assertNull(registerRequest2.getFirstName());
        assertNull(registerRequest2.getLastName());
        assertNull(registerRequest2.getEmail());
        assertNull(registerRequest2.getPassword());
        assertNull(registerRequest2.getUserRole());
    }

    @Test
    void testSetters() {
        registerRequest1.setFirstName("Admin");
        registerRequest1.setLastName("Test2");
        registerRequest1.setEmail("admindemo@gmail.com");
        registerRequest1.setPassword("admindemo");
        registerRequest1.setUserRole(UserRole.ADMIN);


        assertEquals("Admin", registerRequest1.getFirstName());
        assertEquals("Test2", registerRequest1.getLastName());
        assertEquals("admindemo@gmail.com", registerRequest1.getEmail());
        assertEquals("admindemo", registerRequest1.getPassword());
        assertEquals(UserRole.ADMIN, registerRequest1.getUserRole());
    }
}
