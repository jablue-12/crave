package com.crave.backend.gpt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGPTRequest {
    private String model;
    private List<ChatGPTRequestMessage> messages;

    public ChatGPTRequest(Request request) {
        this.model = "gpt-3.5-turbo-16k-0613";
        this.messages = List.of(
                new ChatGPTRequestMessage(request)
        );
    }
}