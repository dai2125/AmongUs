package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
//import com.example.messagingstompwebsocket.chat.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.game.WebConfiguration.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MovementService movementService;

    @Autowired
    private RegisterService registerService;

    @Autowired
    private ActionService actionService;

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {
//        messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.disconnectUser(event.getSessionId())));


        for(User u : registerService.userList) {
            registerService.userList.remove(u);
            messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(event.getSessionId()));
        }
    }

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.registerUser(user, simpMessageHeaderAccessor)));

            for(User u : registerService.userList) {
                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));
            }
            if(registerService.startGame && !registerService.sendAlready) {
                messagingTemplate.convertAndSend("/topic/startGame/", "test");
                registerService.sendAlready = true;
            }
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
//        registerService.updatePlayerPosition(user);
//        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));

        if(movementService.wallCollision2(user)) {
            registerService.updatePlayerPosition(user);
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(user));
        }

    }

    @MessageMapping("/task/{userId}")
    @SendTo("/topic/task/{userId}")
    public void processAction(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
//        messagingTemplate.convertAndSend("/topic/task/" + user.getUserName(), new ObjectMapper().writeValueAsString("check"));

        // TODO
        for (User u : registerService.userList) {
            messagingTemplate.convertAndSend("/topic/task/" + u.getUserName(), new ObjectMapper().writeValueAsString("task"));
        }
    }

    @MessageMapping("/kill/{userName}")
    public void processKill(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        for(User u : registerService.userList) {
            if(!u.getSessionId().equals(user.getSessionId())) {
                if (u.getY() == user.getY() + 1 || u.getY() == user.getY() - 1 || u.getY() == user.getY() && u.getX() == user.getX() + 1 || u.getX() == user.getX() - 1 ||  u.getY() == user.getY()) {
                    messagingTemplate.convertAndSend("/topic/kill/" + user.getUserName(), new ObjectMapper().writeValueAsString("kill"));
                    messagingTemplate.convertAndSend("/topic/dead/" + u.getUserName(), new ObjectMapper().writeValueAsString("dead"));

//                    for(User u2 : registerService.userList) {
//                        if(!u2.getUserName().equals(u.getUserName()) && !u2.getUserName().equals(user.getUserName())) {
//                            System.out.println("SUBSCRIBER: " + u2.getUserName() + " " + u2.getSessionId() + " x: " + u2.getX() + " y: " + u2.getY());
                            messagingTemplate.convertAndSend("/topic/someoneGotKilled/", new ObjectMapper().writeValueAsString(u.getSessionId()));
//                        }
//                    }
                }
            }
//            messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(user.getSessionId()));
        }

    }

    @MessageMapping("/movement/CLOSED/{userId}")
    public void movementUserId(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/{userId}", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
    }
}
