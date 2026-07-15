package com.vinayappari.portfolio_backend.service;

import com.vinayappari.portfolio_backend.dto.ChatRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public Flux<String> streamChat(String message, List<ChatRequest.Message> history) {
        List<Message> springMessages = new ArrayList<>();
        
        if (history != null) {
            for (ChatRequest.Message msg : history) {
                if ("user".equals(msg.role())) {
                    springMessages.add(new UserMessage(msg.content()));
                } else if ("assistant".equals(msg.role())) {
                    springMessages.add(new AssistantMessage(msg.content()));
                }
            }
        }
        
        springMessages.add(new UserMessage(message));

        return this.chatClient.prompt()
                .messages(springMessages)
                .stream()
                .content();
    }
}
