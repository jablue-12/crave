package com.crave.backend.integration;

import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import com.crave.backend.model.Account;
import com.crave.backend.model.Comment;
import com.crave.backend.model.auth.AuthenticationResponse;
import com.crave.backend.model.auth.RegisterRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.crave.backend.enums.OrderStatus;
import com.crave.backend.enums.UserRole;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
    public void testGetDishes() {
        String url = "http://localhost:" + port + "/" + path;

        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);
        System.out.println(response.toString());
        assertEquals(OK, response.getStatusCode());
        assertTrue(response.getBody().size() > 1);
    }

    @Test
    public void testCreateDish() {
        String url = "http://localhost:" + port + "/" + path;
        List<Long> list = new ArrayList<>();
        list.add(1L);


        Dish dish = Dish.builder()
            .name("Haiwain Pizza")
            .description("Description for Haiwain Pizza")
            .tag("Pizza")
            .ingredientIds(List.of())
            .price(25f)
            .rating(3.5f)
            .build();

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(dish);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        
        
        HttpEntity<Dish> requestEntity = new HttpEntity<>(dish, headers);

        ResponseEntity<Dish> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Dish.class
        );

        assertEquals(CREATED, response.getStatusCode());
        assertEquals("Haiwain Pizza", response.getBody().getName());
        assertEquals("Pizza", response.getBody().getTag());
        assertEquals(25, response.getBody().getPrice());
        assertEquals(3.5, response.getBody().getRating());
        

    }
}