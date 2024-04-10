package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.User;
import com.example.messagingstompwebsocket.DataModel.UserMovement;
import com.example.messagingstompwebsocket.Map.DefaultMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.HashSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);
    private final HashSet<User> currentUsers = new HashSet<>();

    private final SimpMessagingTemplate messagingTemplate;
    private DefaultMap defaultMap = new DefaultMap();

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

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
    int counter = 0;

    @MessageMapping("/register/{userId}")
    @SendTo("/topic/register/")
    public void register(@Payload User user) throws JsonProcessingException {
        if(user.getUserId().equals("null")  || user.getUserId().equals("11") || user.getUserId().contains("11")) {
            user.setUserId(UUID.randomUUID().toString());
            user.setColor(colors[counter++]);
            user.setAction("null");
            user.setX(r.nextInt(5) + 2);
            user.setY(r.nextInt(5) + 2);
            System.out.println("REGISTER a new User: " + user.toString());
            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());

            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(userMovement));
        }
        if(counter ==  colors.length - 1) {
            counter = 0;
        }
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user) throws JsonProcessingException {

        if (user.getAction().equals("ArrowUp") && !defaultMap.isWall(user.getY() - 1, user.getX())) {
            user.setY(user.getY() - 1);
            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowDown") && !defaultMap.isWall(user.getY() + 1, user.getX())) {
            user.setY(user.getY() + 1);
            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowLeft") && !defaultMap.isWall(user.getY(), user.getX() - 1)) {
            user.setX(user.getX() - 1);
            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowRight") && !defaultMap.isWall(user.getY(), user.getX() + 1)) {
            user.setX(user.getX() + 1);
            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        }

        if (currentUsers.stream().noneMatch(u -> u.getUserId().equals(user.getUserId()))) {
            logger.warn("New user connected: {}"/*, userId*/);
            currentUsers.add(user);
        }
    }
}
