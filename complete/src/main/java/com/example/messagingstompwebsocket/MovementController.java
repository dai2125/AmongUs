package com.example.messagingstompwebsocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@DestinationVariable String userId, @Payload User user) throws JsonProcessingException {

        Map<String, String> response = new HashMap<>();
        response.put("action", user.getAction());
        response.put("userId", user.getUserId());

        logger.atInfo().log("User %s performed action %s", user.getUserId(), user.getAction());

        String jsonResponse = new ObjectMapper().writeValueAsString(response);
        messagingTemplate.convertAndSend("/topic/movement/", jsonResponse);
    }
}
