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
public class CommentControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String path = "dishes";


    @Test
    public void testGetComments() {
        Long dishId = 1L;
        String url = "http://localhost:" + port + "/dishes/" + dishId + "/comments";
        ResponseEntity<Comment[]> response = restTemplate.getForEntity(url, Comment[].class);

        assertEquals(OK, response.getStatusCode());
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

        assertEquals(FORBIDDEN, response.getStatusCode());
    }



}