package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.User;
import com.example.messagingstompwebsocket.DataModel.UserMovement;
import com.example.messagingstompwebsocket.Map.DefaultMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    private final HashSet<User> currentUsers = new HashSet<>();
    private final SimpMessagingTemplate messagingTemplate;

    private MovementService movementService = new MovementService();
    private DefaultMap defaultMap = new DefaultMap();
    ArrayList<User> userArrayList = new ArrayList<>();

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());

        System.out.println("SessionConnectEvent headers.getSessiondId() : " + headers.getSessionId());
        String sessionId = headers.getSessionId();
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {
        // TODO message all Players a connection got lost
        System.out.println("SessionDisconnectEvent : " + event.toString());
        event.getSessionId();

        for(User u : userArrayList) {
            if(u.getUserId().equals(event.getSessionId())) {
                u.setAction("offline");
                UserMovement userMovement = new UserMovement(u.getAction(), u.getUserId(), u.getColor(), u.getX(), u.getY());
                messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(userMovement));
                userArrayList.remove(u);
                break;
            }
        }
        messagingTemplate.convertAndSend("/topic/disconnected/", event.getSessionId());
    }

    String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    Random r = new Random();
    int counter = 0;

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        if(user.getUserId().isEmpty()) {
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setColor(colors[counter++]);
            user.setAction("null");
            user.setX(r.nextInt(5) + 2);
            user.setY(r.nextInt(5) + 2);

            userArrayList.add(user);

            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());

            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(userMovement));
            }

        for(int i = 0; i < userArrayList.size(); i++) {
            UserMovement userMovement1 = new UserMovement(userArrayList.get(i).getAction(), userArrayList.get(i).getUserId(), userArrayList.get(i).getColor(), userArrayList.get(i).getX(), userArrayList.get(i).getY());
            messagingTemplate.convertAndSend("/topic/connected/", new ObjectMapper().writeValueAsString(userMovement1));
        }
        if(counter ==  colors.length - 1) {
            counter = 0;
        }
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
    }

}
