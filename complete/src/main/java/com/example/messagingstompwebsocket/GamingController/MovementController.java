package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.MovementResponse;
import com.example.messagingstompwebsocket.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


import java.util.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);
    private final HashSet<User> currentUsers = new HashSet<>();

    private final SimpMessagingTemplate messagingTemplate;

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

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
    ArrayList<User> users = new ArrayList<>();


    @MessageMapping("/register/{userId}")
    @SendTo("/topic/register/")
    public void register(@Payload User user) throws JsonProcessingException {
//        User newUser = new User();
        System.out.println("REGISTER so kommt der User an: " + user.toString());
        if(user.getUserId().equals("null")  || user.getUserId().equals("11") || user.getUserId().contains("11")) {
//            user.setUserId(r.nextInt(1000) + "");
            user.setUserId(UUID.randomUUID().toString());
            user.setColor(colors[counter++]);
            user.setAction("null");
            user.setX(r.nextInt(5) + 2);
            user.setY(r.nextInt(5) + 2);
//            User newUser = new User("null", UUID.randomUUID().toString(), colors[counter++], r.nextInt(5) + 2, r.nextInt(5) + 2);
            System.out.println("REGISTER a new User: " + user.toString());
            MovementResponse movementResponse = new MovementResponse(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());

            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(movementResponse));
        }
        if(counter ==  colors.length - 1) {
            counter = 0;
        }
//        user.setX(r.nextInt(50) + 100);
//        user.setY(r.nextInt(50) + 100);
//        if(user.getUserId() == null || user.getUserId().isEmpty()) {
//            user.setUserId(r.nextInt(1000) + "");
//            System.out.println("userId changed to: " + user.getUserId());
//        }
        System.out.println("REGISTER a new User: " + user.toString());
//        users.add(user);
//        for(User u : users) {
//            if(!u.getUserId().equals(user.getUserId())) {
//                System.out.println("List of users: " + u.toString());
//                MovementResponse movementResponse = new MovementResponse(u.getUserId(), u.getAction(), u.getColor(), u.getX(), u.getY());
//                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(movementResponse));
//            }
//        }
        MovementResponse movementResponse = new MovementResponse(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());

        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(movementResponse));
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(/*@DestinationVariable String userId, */@Payload User user) throws JsonProcessingException {


        user.setY(user.getY());
        user.setX(user.getX());
        MovementResponse movementResponse = new MovementResponse(user.getAction(), user.getUserId() , user.getColor(), user.getX(), user.getY());
        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementResponse));


        // Assuming currentUsers is a Set<User> containing unique users based on userId
        if (currentUsers.stream().noneMatch(u -> u.getUserId().equals(user.getUserId()))) {
            logger.warn("New user connected: {}"/*, userId*/);
            currentUsers.add(user);
        }

        System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
    }
}
