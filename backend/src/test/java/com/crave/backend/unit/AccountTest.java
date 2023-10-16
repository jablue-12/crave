package com.crave.backend.unit;

import com.crave.backend.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AccountTest {
    private Account user;

    @BeforeEach
    public void setUp() {
        user = new Account(1L, "Dushane Hill", "Summerhouse estates", "dhill@gmail.co.uk", "idkruhfaminnit");
    }

    @Test
    void testGetters() {
        assertEquals(1L, user.getId());
        assertEquals("Dushane Hill", user.getName());
        assertEquals("Summerhouse estates", user.getAddress());
        assertEquals("dhill@gmail.co.uk", user.getEmail());
        assertEquals("idkruhfaminnit", user.getPassword());
    }

    @Test
    void testSetters() {
        user.setId(2L);
        user.setName("Gerrard sullivan");
        user.setAddress("The London fields");
        user.setEmail("sully.gerrard@yahoo.co.uk");
        user.setPassword("icanneverbefood");

        assertEquals(2L, user.getId());
        assertEquals("Gerrard sullivan", user.getName());
        assertEquals("The London fields", user.getAddress());
        assertEquals("sully.gerrard@yahoo.co.uk", user.getEmail());
        assertEquals("icanneverbefood", user.getPassword());
    }
}
