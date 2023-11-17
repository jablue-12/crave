package com.crave.backend.integration;

import com.crave.backend.model.UserOrder;
import com.crave.backend.enums.OrderStatus;
import com.crave.backend.model.Token;
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
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NO_CONTENT;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserOrderControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String token;





    @Test
    public void testGetUserOrders() {
        String url = "http://localhost:" + port + "/userOrders";
        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);
        assertEquals(FORBIDDEN, response.getStatusCode());
        assertEquals(null, response.getBody()); // DB has 2 ingredients by default. Look at CraveConfig
    }

    @Test
    public void testGetUserOrderById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/userOrders/" + id;

        ResponseEntity<UserOrder> response = restTemplate.getForEntity(url, UserOrder.class);

        assertEquals(FORBIDDEN, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateUserOrderById() {
        String url = "http://localhost:" + port + "/userOrders/";
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        
        UserOrder userOrder = UserOrder.builder()
                .status(OrderStatus.DONE)
                .build();

        HttpEntity<UserOrder> requestEntity = new HttpEntity<>(userOrder, headers);


        ResponseEntity<UserOrder> response = restTemplate.exchange(
            url,
            HttpMethod.POST,
            requestEntity,
            UserOrder.class
        );

        assertEquals(OK, response.getStatusCode());
        assertEquals(userOrder.getStatus(), response.getBody().getStatus());
    }


    @Test
    public void testUpdateUserOrderById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/userOrders/" + id;
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        
        UserOrder userOrder = UserOrder.builder()
                .status(OrderStatus.DONE)
                .build();

        HttpEntity<UserOrder> requestEntity = new HttpEntity<>(userOrder, headers);


        ResponseEntity<UserOrder> response = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            requestEntity,
            UserOrder.class
        );

        assertEquals(OK, response.getStatusCode());
        assertEquals(userOrder.getStatus(), response.getBody().getStatus());
    }

    @Test
    public void testDeleteUserOrderById() {
        Long id = 1L;
        String url = "http://localhost:" + port + "/userOrders/" + id;
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer {test.jwt.token}");
        
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        

        assertEquals(NO_CONTENT, response.getStatusCode());
        assertEquals("Order deleted successfully", response.getBody());
    }
}