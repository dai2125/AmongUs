package com.team2.game.GamingController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.game.DataModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
//@PropertySource("classpath:application.properties")
public class MovementController2 {

    @Autowired
    private MovementService movementService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private GameInstance gameInstance;

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
    }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {
    }

    @MessageMapping("/movement/north/{userName}")
    public void movementNorth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallNorth(user)) {
            user.setY(user.getY() - 1);
            System.out.println("movement/north/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());

            messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));

        }
    }

    @MessageMapping("/movement/south/{userName}")
    public void movementSouth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallSouth(user)) {
            user.setY(user.getY() + 1);
            System.out.println("movement/south/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());

            messagingTemplate.convertAndSend("/topic/movement/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/west/{userName}")
    public void movementWest(@Payload User user) throws JsonProcessingException {
        if (movementService.wallWest(user)) {
            user.setX(user.getX() - 1);
            System.out.println("movement/west/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/east/{userName}")
    public void movementEast(@Payload User user) throws JsonProcessingException {
        if (movementService.wallEast(user)) {
            user.setX(user.getX() + 1);
            System.out.println("movement/east/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());

            messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

}
