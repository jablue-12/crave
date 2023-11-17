package com.crave.backend.integration;

import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
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
            .price(25.99f)
            .rating(3.5f)
            .build();

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(dish);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // String jsonContent = "{ \"name\": \"Haiwain Pizza\", \"description\": \"Description for Haiwain Pizza\", \"tag\": \"Pizza\", \"ingredientIds\": [0, 1], \"price\": 25.99, \"rating\": 3.5 }";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        
        
        HttpEntity<Dish> requestEntity = new HttpEntity<>(dish, headers);

        ResponseEntity<Dish> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Dish.class
        );
        System.out.println("=========================================================================================================");
        System.out.println(response.getBody());

        assertEquals(CREATED, response.getStatusCode());
        assertEquals("Haiwain Pizza", response.getBody().getName());
        assertEquals("Pizza", response.getBody().getTag());
        assertEquals(25.99, response.getBody().getPrice());
        assertEquals(3.5, response.getBody().getRating());
        

    }

    @Test
    public void testGetComments() {
        Long dishId = 1L;
        String url = "http://localhost:" + port + "/dishes/" + dishId + "/comments";
        ResponseEntity<Comment[]> response = restTemplate.getForEntity(url, Comment[].class);

        assertEquals(OK, response.getStatusCode());
    }

    @Test
    public void testCreateComment() {
        Long dishId = 1L;
        String url = "http://localhost:" + port + "/dishes/" + dishId + "/comments";
        Comment newComment = Comment.builder()
                            .content("new Content")
                            .createdAt(LocalDateTime.now())
                            .build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Comment> requestEntity = new HttpEntity<>(newComment, headers);
        ResponseEntity<Comment> response = restTemplate.postForEntity(url, requestEntity, Comment.class);

        assertEquals(CREATED, response.getStatusCode());
    }

    @Test
    public void testUpdateComment() {
        Long dishId = 1L;
        Long commentId = 1L;
        String url = "http://localhost:" + port + "/dishes/" + dishId + "/comments/" + commentId;
        Comment updatedComment = Comment.builder()
                            .content("new Content")
                            .createdAt(LocalDateTime.now())
                            .build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Comment> requestEntity = new HttpEntity<>(updatedComment, headers);
        ResponseEntity<Comment> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Comment.class);

        assertEquals(CREATED, response.getStatusCode());
    }



}



// private String token = registerAndReturnToken();
    
//     public String registerAndReturnToken() {
//         String registerUrl = "http://localhost:" + port + "/auth/register";

//         HttpHeaders headers = new HttpHeaders();
//         headers.set("Content-Type", "application/json");

//         // Create a simple RegisterRequest with a hardcoded username
//         String username = "testuser1";
//         String password = "password123";  // You may want to set a secure password in practice
//         String email = "testuser1@example.com";
//         String fullName = "Test User";

//         RegisterRequest registerRequest = new RegisterRequest(username, password, email, fullName, UserRole.ADMIN);

//         HttpEntity<RegisterRequest> requestEntity = new HttpEntity<>(registerRequest, headers);

//         ResponseEntity<AuthenticationResponse> responseEntity = new RestTemplate().postForEntity(registerUrl, requestEntity, AuthenticationResponse.class);

//         AuthenticationResponse response = responseEntity.getBody();

//         if (response != null && response.getToken() != null) {
//             return response.getToken();

//         } else {
//             throw new RuntimeException("Failed to register user: " + response);
//         }
//     }