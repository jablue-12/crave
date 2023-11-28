package com.crave.backend.gpt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class ChatGPTRequestMessage {
    private String role;
    private String content;

    public ChatGPTRequestMessage(Request request) {
        this.role = "user";
        this.content = request.content();
    }
}
