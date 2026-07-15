package com.vinayappari.portfolio_backend.controller;

import com.vinayappari.portfolio_backend.dto.ChatRequest;
import com.vinayappari.portfolio_backend.service.ChatService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Flux;
import static org.assertj.core.api.Assertions.assertThat;

class ChatControllerTest {

    @Test
    void testStreamChat() {
        ChatService chatService = Mockito.mock(ChatService.class);
        Mockito.when(chatService.streamChat("hello")).thenReturn(Flux.just("hi"));

        ChatController controller = new ChatController(chatService);
        Flux<String> result = controller.streamChat(new ChatRequest("hello"));

        assertThat(result.blockFirst()).isEqualTo("hi");
    }
}
