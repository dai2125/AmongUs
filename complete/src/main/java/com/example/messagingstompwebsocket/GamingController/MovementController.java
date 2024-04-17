package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    private SimpMessagingTemplate messagingTemplate;
    private MovementService movementService = new MovementService();
    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private RegisterService registerService = new RegisterService();


    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        System.out.println("SessionConnectEvent headers.getSessiondId() : " + headers.getSessionId());
        String sessionId = headers.getSessionId();
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {

        messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.disconnectUser(event.getSessionId())));
        // TODO message all Players a connection got lost
//        System.out.println("SessionDisconnectEvent : " + event.toString());
//        event.getSessionId();
//
//        for(User u : userList) {
//            if(u.getUserId().equals(event.getSessionId())) {
//                u.setAction("offline");
//                UserMovement userMovement = new UserMovement(u.getAction(), u.getUserId(), u.getColor(), u.getX(), u.getY());
//                messagingTemplate.convertAndSend("/topic/disconnected/",
//                                                    new ObjectMapper().writeValueAsString(userMovement));
//                userList.remove(u);
//                break;
//            }
//        }
//        messagingTemplate.convertAndSend("/topic/disconnected/", event.getSessionId());
    }

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.registerUser(user, simpMessageHeaderAccessor)));
        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.updateAllUserWithTheNewUser()));

//        registerService.registerUser(user, simpMessageHeaderAccessor);
//        registerService.updateAllUserWithTheNewUser();

//        if(user.getUserId().isEmpty()) {
//            user.setUserId(simpMessageHeaderAccessor.getSessionId());
//            user.setColor(colors[counter++]);
//            user.setAction("null");
//            user.setX(r.nextInt(5) + 2);
//            user.setY(r.nextInt(5) + 2);
//
//            userList.add(user);
//
//            UserMovement userMovement = new UserMovement(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
//
//            messagingTemplate.convertAndSend("/topic/register/",
//                                                new ObjectMapper().writeValueAsString(userMovement));
//            }
//
//        for(int i = 0; i < userList.size(); i++) {
//            UserMovement userMovement1 = new UserMovement(userList.get(i).getAction(), userList.get(i).getUserId(), userList.get(i).getColor(), userList.get(i).getX(), userList.get(i).getY());
//            messagingTemplate.convertAndSend("/topic/connected/",
//                                                new ObjectMapper().writeValueAsString(userMovement1));
//        }
//        if(counter ==  colors.length - 1) {
//            counter = 0;
//        }
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/",
                                            new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
    }

    @MessageMapping("/movement/CLOSED/{userId}")
//    @SendTo("/topic/movement/{userId}")
    public void movementUserId(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/{userId}",
                                            new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
    }

}
