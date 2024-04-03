package com.example.messagingstompwebsocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.awt.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    HashSet<User> userSet = new HashSet<>();

//    @EventListener
//    public void sessionConnectEvent(SessionConnectEvent event) {
//        System.out.println("SessionConnectEvent : " );
//    }

//    @EventListener
//    public void handleMovement(SessionDisconnectEvent event) {
//        System.out.println("SessionDisconnectEvent : ");
//    }

    String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    Random r = new Random();
    Map<String, String> response = new HashMap<>();
    int counter = 0;


    @MessageMapping("/register/{userId}")
    @SendTo("/topic/register/")
    public void register(@Payload User user) throws JsonProcessingException {
        user.setColor(colors[counter++]);
        user.setX(r.nextInt(50) + 100);
        user.setY(r.nextInt(50) + 100);
        System.out.println("REGISTER: " + user.toString());
        MovementResponse movementResponse = new MovementResponse(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());

        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(movementResponse));
    }


    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(/*@DestinationVariable String userId, */@Payload User user) throws JsonProcessingException {

        user.setY(user.getY());
        user.setX(user.getX());
        MovementResponse movementResponse = new MovementResponse(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementResponse));

        logger.atInfo().log("User %s performed action %s", user.getUserId(), user.getAction());

        System.out.println(user.toString());
    }
}
