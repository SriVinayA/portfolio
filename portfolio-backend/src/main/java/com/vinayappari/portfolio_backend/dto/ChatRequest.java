package com.vinayappari.portfolio_backend.dto;

import java.util.List;
import jakarta.validation.constraints.NotBlank;

public record ChatRequest(
    @NotBlank(message = "Message cannot be blank") 
    String message,
    List<Message> history
) {
    public record Message(String role, String content) {}
}
