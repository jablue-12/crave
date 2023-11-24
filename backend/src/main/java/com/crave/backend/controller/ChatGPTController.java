package com.crave.backend.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatGPTController {
    public record Request (String content) {}

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String response;

        public Response(ChatGPTResponse response) {
            this.response = response.getChoices().stream()
                    .findFirst()
                    .map(Choice::message)
                    .map(Message::content)
                    .orElse("Error calling ChatGPT");
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static final class ChatGPTRequestMessage {
        private String role;
        private String content;

        public ChatGPTRequestMessage(Request request) {
            this.role = "user";
            this.content = request.content;
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static final class ChatGPTRequest {
        private String model;
        private List<ChatGPTRequestMessage> messages;

        public ChatGPTRequest(Request request) {
                this.model = "gpt-3.5-turbo-16k-0613";
                this.messages = List.of(
                        new ChatGPTRequestMessage(request)
                );
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class ChatGPTResponse {
        public String id;
        public List<Choice> choices;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Choice(int index, Message message) {}

    public record Message(String role, String content) {}

    @Service
    public static class ChatGPTRequestBuilder {
        private final RestTemplate rest;
        private final String url, secret;

        public ChatGPTRequestBuilder(
                @Value("${ai.secret}") String secret,
                @Value("${ai.url}") String url) {
            this.secret = secret;
            this.url = url;
            this.rest = new RestTemplate();
        }

        public ChatGPTResponse process(Request request) {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + secret);
            HttpEntity<ChatGPTRequest> entity = new HttpEntity<>(new ChatGPTRequest(request), headers);
            ResponseEntity<ChatGPTResponse> response = rest.postForEntity(url, entity, ChatGPTResponse.class);
            return response.getBody();
        }
    }

    @Autowired
    private final ChatGPTRequestBuilder gpt;

    @PostMapping()
    public ResponseEntity<Response> chat(@RequestBody Request request) {
        return ok(new Response(gpt.process(request)));
    }
}
