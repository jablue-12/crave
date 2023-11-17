package com.crave.backend.integration;

import com.crave.backend.model.Dish;
import com.crave.backend.enums.OrderStatus;
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
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DishControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String path = "dishes";

    @Test
    public void testGetDishs() {
        String url = "http://localhost:" + port + "/" + path;

        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);

        assertEquals(FORBIDDEN, response.getStatusCode());
        assertTrue(response.getBody().size() > 1); // DB has 2 ingredients by default. Look at CraveConfig
    }

    @Test
    public void testGetDishById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/" + path + id;

        ResponseEntity<Dish> response = restTemplate.getForEntity(url, Dish.class);

        assertEquals(FORBIDDEN, response.getStatusCode());
        assertNotEquals(, response.getBody());
    }

    @Test
    public void testCreateDishById() {
        String url = "http://localhost:" + port + "/" + path;
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        
        Dish userOrder = Dish.builder()
                .build();

        HttpEntity<Dish> requestEntity = new HttpEntity<>(userOrder, headers);


        ResponseEntity<Dish> response = restTemplate.exchange(
            url,
            HttpMethod.POST,
            requestEntity,
            Dish.class
        );

        assertEquals(OK, response.getStatusCode());

    }


    @Test
    public void testUpdateDishById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/" + path + "/" + id;
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        
        Dish userOrder = Dish.builder()
                .build();

        HttpEntity<Dish> requestEntity = new HttpEntity<>(userOrder, headers);


        ResponseEntity<Dish> response = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            requestEntity,
            Dish.class
        );

        assertEquals(OK, response.getStatusCode());
    }

    @Test
    public void testDeleteDishById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/" + path + "/" + id;
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        

        assertEquals(NO_CONTENT, response.getStatusCode());
        assertEquals("Order deleted successfully", response.getBody());
    }
}