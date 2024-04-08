package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.WebSocketResponse;
import com.example.messagingstompwebsocket.DataModel.User;
import com.example.messagingstompwebsocket.MapGrid.MapGrid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import java.util.*;
import java.util.HashSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);
    private final HashSet<User> currentUsers = new HashSet<>();

    private final SimpMessagingTemplate messagingTemplate;

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    public MapGrid mapGrid = new MapGrid();
    private static final String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    Random r = new Random();
    int counter = 0;

    @EventListener
//    @SendTo("/topic/register/")
    public void handleWebSocketConnectListener(SessionConnectEvent event) throws JsonProcessingException {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("SessionConnectEvent 1 : " + stompHeaderAccessor.getSessionId());
//        User user = new User
//                        (stompHeaderAccessor.getSessionId(),
//                                "null",
//                        (UUID.randomUUID().toString()),
//                        (colors[counter++]),
//                        (r.nextInt(5) + 2),
//                        (r.nextInt(5) + 2));
//        save(user);
//        WebSocketResponse webSocketResponse = new WebSocketResponse(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
//        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(webSocketResponse));
//        if(counter ==  colors.length - 1) {
//            counter = 0;
//        }

        logger.info("Connect event [sessionId: {}]", stompHeaderAccessor.getSessionId());
    }

    @EventListener
//    @SendTo("/topic/register/")
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) throws JsonProcessingException {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("Disconnect event [sessionId: " + stompHeaderAccessor.getSessionId() + "]");

//        User user = findById(Integer.valueOf(stompHeaderAccessor.getSessionId())).get();
//        deleteById(Integer.valueOf(stompHeaderAccessor.getSessionId()));
//        UserRegister userRegister = new UserRegister(user.getUserId(), user.getColor(), user.getX(), user.getY(), false);

//        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(userRegister));

        logger.info("Disconnect event [sessionId: {}]", stompHeaderAccessor.getSessionId());
    }


    @MessageMapping("/register/{userId}")
    @SendTo("/topic/register/")
    public void register(@Payload User user) throws JsonProcessingException {
        if(user.getUserId().equals("null")  || user.getUserId().equals("11") || user.getUserId().contains("11")) {
            user.setUserId(UUID.randomUUID().toString());
            user.setColor(colors[counter++]);
            user.setAction("null");
            user.setX(r.nextInt(5) + 2);
            user.setY(r.nextInt(5) + 2);
            WebSocketResponse webSocketResponse = new WebSocketResponse(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());

            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(webSocketResponse));
        }
        if(counter == colors.length - 1) {
            counter = 0;
        }
        System.out.println("REGISTER a new User: " + user.toString());
        WebSocketResponse webSocketResponse = new WebSocketResponse(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());

        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(webSocketResponse));
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(/*@DestinationVariable String userId, */@Payload User user) throws JsonProcessingException {

        if(user.getAction().equals("ArrowUp") && !mapGrid.isWall(user.getX(), user.getY() - 1)) {
            user.setY(user.getY() - 1);
        } else if(user.getAction().equals("ArrowDown") && !mapGrid.isWall(user.getX(), user.getY() + 1)) {
            user.setY(user.getY() + 1);
        } else if(user.getAction().equals("ArrowLeft") && !mapGrid.isWall(user.getX() - 1, user.getY())) {
            user.setX(user.getX() - 1);
        } else if(user.getAction().equals("ArrowRight") && !mapGrid.isWall(user.getX() + 1, user.getY())) {
            user.setX(user.getX() + 1);
        } else {
            System.out.println("Wall detected " + user.getX() + ", " + user.getY());
        }
        user.setAction(user.getAction());

        WebSocketResponse webSocketResponse = new WebSocketResponse(user.getAction(), user.getUserId() , user.getColor(), user.getX(), user.getY());
        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(webSocketResponse));

        if (currentUsers.stream().noneMatch(u -> u.getUserId().equals(user.getUserId()))) {
            logger.warn("New user connected: {}"/*, userId*/);
            currentUsers.add(user);
        }

        System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
    }

}
