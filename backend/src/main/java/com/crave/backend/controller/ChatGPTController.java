package com.crave.backend.controller;

import com.crave.backend.gpt.ChatGPTRequest;
import com.crave.backend.gpt.ChatGPTResponse;
import com.crave.backend.gpt.Request;
import com.crave.backend.gpt.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/chat")
public class ChatGPTController {
    @PostMapping()
    public ResponseEntity<Response> chat(@RequestBody Request request) {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + System.getenv("ChatGPT_API_KEY"));
        HttpEntity<ChatGPTRequest> entity = new HttpEntity<>(new ChatGPTRequest(request), headers);
        ResponseEntity<ChatGPTResponse> response = rest.postForEntity("https://api.openai.com/v1/chat/completions", entity, ChatGPTResponse.class);
        Response result = new Response(Objects.requireNonNull(response.getBody()));
        return ok(result);
    }

}
