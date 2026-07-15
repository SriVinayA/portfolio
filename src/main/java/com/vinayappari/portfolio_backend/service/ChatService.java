package com.vinayappari.portfolio_backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public Flux<String> streamChat(String message) {
        return this.chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }
}
