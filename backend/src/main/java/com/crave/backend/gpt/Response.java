package com.crave.backend.gpt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private String response;

    public Response(ChatGPTResponse response) {
        this.response = response.getChoices().stream()
                .findFirst()
                .map(Choice::message)
                .map(Message::content)
                .orElse("Error calling ChatGPT");
    }
}
