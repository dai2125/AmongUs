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

    private DefaultMap defaultMap = new DefaultMap();
    ArrayList<User> userArrayList = new ArrayList<>();

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
        System.out.println("SessionConnectEvent event.toString() : " + event.toString());

        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
//        System.out.println("SessionConnectEvent : " + headers.getUser());
//        System.out.println("SessionConnectEvent : " + headers.getDestination());
//        System.out.println("SessionConnectEvent : " + headers.getMessageType());
//
        System.out.println("SessionConnectEvent headers.getSessiondId() : " + headers.getSessionId());
        String sessionId = headers.getSessionId();
        User user = new User("online", sessionId, colors[counter++], r.nextInt(5) + 2, r.nextInt(5) + 2); //r.nextInt(5) + 2
        userArrayList.add(user);
//        Thread.sleep(1000);
//        playerConnected(sessionId, user);
        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(user));

        if(counter ==  colors.length - 1) {
            counter = 0;
        }

    }

    @EventListener
    public void handleMovement(SessionDisconnectEvent event) throws JsonProcessingException {
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


        System.out.println("Register SessionConnectEvent : " + simpMessageHeaderAccessor.getSessionId());

        if(user.getUserId().isEmpty()) {
//            user.setSessionId(sessionId);
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setColor(colors[counter++]);
            user.setAction("null");
            user.setX(r.nextInt(5) + 2);
            user.setY(r.nextInt(5) + 2);

            userArrayList.add(user);

            System.out.println("REGISTER a new User: " + user.toString());
            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());

//            for(User u : userArrayList) {
                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(userMovement));
            }
//            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(userMovement));
//        }
        if(counter ==  colors.length - 1) {
            counter = 0;
        }
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        System.out.println("processMovement: " + simpMessageHeaderAccessor.getSessionId());

        if (user.getAction().equals("ArrowUp") && !defaultMap.isWall(user.getY() - 1, user.getX())) {
            user.setY(user.getY() - 1);
            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowDown") && !defaultMap.isWall(user.getY() + 1, user.getX())) {
            user.setY(user.getY() + 1);
            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowLeft") && !defaultMap.isWall(user.getY(), user.getX() - 1)) {
            user.setX(user.getX() - 1);
            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        } else if (user.getAction().equals("ArrowRight") && !defaultMap.isWall(user.getY(), user.getX() + 1)) {
            user.setX(user.getX() + 1);
            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(userMovement));
            System.out.println("Movement: User=" + user.getUserId() + " moved=" + user.getX() + ", " + user.getY());
        }

        if (currentUsers.stream().noneMatch(u -> u.getUserId().equals(user.getUserId()))) {
            logger.warn("New user connected: {}"/*, userId*/);
            currentUsers.add(user);
        }
    }

//    private void playerDisconnected(String sessionId) {
//        User user = userArrayList.stream().filter(u -> u.getSessionId().equals(sessionId)).findFirst().orElse(null);
//        if (user != null) {
//            user.setAction("offline");
//            UserMovement userMovement = new UserMovement(user.getSessionId(), user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
//            messagingTemplate.convertAndSend("/topic/register/", userMovement);
//            userArrayList.remove(user);
//        }
//    }

    private void  playerConnected(String sessionId, User user) {
//        String sessionId = sessionId2.substring(sessionId2.indexOf("sessionId=") + 10, sessionId2.indexOf(","));
        System.out.println("playerConnected:" + sessionId);
        if (user != null) {
//            user.setAction("online");
//            for(int i = 0; i < userArrayList.size(); i++) {
//                if(!userArrayList.get(i).getSessionId().equals(sessionId)) {
//                    UserMovement userMovement = new UserMovement(userArrayList.get(i).getSessionId(), userArrayList.get(i).getAction(), userArrayList.get(i).getUserId(), userArrayList.get(i).getColor(), userArrayList.get(i).getX(), userArrayList.get(i).getY());
                    UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
                    messagingTemplate.convertAndSend("/topic/register/", userMovement);
                }
            }
//            UserMovement userMovement = new UserMovement(user.getUserId(), user.getAction(), user.getColor(), user.getX(), user.getY());
//            messagingTemplate.convertAndSend("/topic/register/", userMovement);
//        }
//    }
}
