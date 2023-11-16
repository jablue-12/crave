package com.crave.backend.unit;

import com.crave.backend.model.auth.AuthenticationResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class AuthenticationResponseTest {
    private AuthenticationResponse authenticationResponse1;
    private AuthenticationResponse authenticationResponse2;

    @BeforeEach
    public void setUp() {
        authenticationResponse1 = AuthenticationResponse.builder()
                .token("this-is-a-sample-token")
                .statusMessage("Successful status message.")
                .build();

        authenticationResponse2 = new AuthenticationResponse();
    }

    @Test
    void testGetters() {
        assertEquals("this-is-a-sample-token", authenticationResponse1.getToken());
        assertEquals("Successful status message.", authenticationResponse1.getStatusMessage());

        assertNull(authenticationResponse2.getToken());
        assertNull(authenticationResponse2.getStatusMessage());
    }

    @Test
    void testSetters() {
        authenticationResponse1.setToken("updated-token");
        authenticationResponse1.setStatusMessage("Failed status message.");


        assertEquals("updated-token", authenticationResponse1.getToken());
        assertEquals("Failed status message.", authenticationResponse1.getStatusMessage());
    }
}
