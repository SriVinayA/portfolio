package com.vinayappari.portfolio_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.ai.chat.client.ChatClient;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class ChatConfiguration {

    @Value("classpath:data/SystemPrompt.md")
    private Resource systemPromptResource;

    @Value("classpath:data/portfolio.md")
    private Resource portfolioResource;

    @Value("classpath:data/FaqAndGuardrails.md")
    private Resource faqResource;

    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) throws IOException {
        String systemPrompt = new String(systemPromptResource.getContentAsByteArray(), StandardCharsets.UTF_8);
        String portfolio = new String(portfolioResource.getContentAsByteArray(), StandardCharsets.UTF_8);
        String faq = new String(faqResource.getContentAsByteArray(), StandardCharsets.UTF_8);

        // Simple string replacement as specified in SystemPrompt.md
        String fullPrompt = systemPrompt
            .replace("{resources/data/portfolio.md}", portfolio)
            + "\n\nFAQ AND GUARDRAILS:\n" + faq;

        return builder.defaultSystem(fullPrompt).build();
    }
}
