package com.team2.chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/app");
//		config.setUserDestinationPrefix("/user");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/chat")
				.setAllowedOrigins("http://localhost:8080", "http://localhost:4173", "http://localhost:5173")
				.withSockJS();
	}
//		registry.addEndpoint("/gs-guide-websocket")
//				.setAllowedOrigins("http://localhost:8080", "http://localhost:4173", "http://localhost:5173")
//				.withSockJS();

//	}

}