package com.crave.backend.integration;

import com.crave.backend.model.Ingredient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IngredientControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testGetIngredients() {
        String url = "http://localhost:" + port + "/ingredients";

        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);

        assertEquals(OK, response.getStatusCode());
        assertEquals(0, response.getBody().size()); // DB has 2 ingredients by default. Look at CraveConfig
    }

    @Test
    public void testCreateIngredient() {
        String url = "http://localhost:" + port + "/ingredients/create";

        Ingredient ingredient = Ingredient.builder()
                .name("TestIngredient")
                .tag("TestTag")
                .quantity(1.0)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Ingredient> requestEntity = new HttpEntity<>(ingredient, headers);

        ResponseEntity<Ingredient> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Ingredient.class
        );

        assertEquals(CREATED, response.getStatusCode());
        assertEquals(ingredient.getName(), response.getBody().getName());
        assertEquals(ingredient.getTag(), response.getBody().getTag());
        assertEquals(ingredient.getQuantity(), response.getBody().getQuantity());

        // Cleanup: Delete the created ingredient if necessary
        restTemplate.delete("http://localhost:" + port + "/ingredients/" + response.getBody().getId());
    }
}
