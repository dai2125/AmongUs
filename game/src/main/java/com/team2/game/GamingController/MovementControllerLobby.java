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
public class MovementControllerLobby {

    @Autowired
    private MovementService movementService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
    }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {
    }

    @MessageMapping("/movement/lobby/north/{userName}")
    public void movementNorth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallNorthLobby(user)) {
            user.setY(user.getY() - 1);
            System.out.println("Lobby Movement NORTH: " + user);
            messagingTemplate.convertAndSend("/topic/movement/lobby/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/lobby/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/lobby/south/{userName}")
    public void movementSouth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallSouthLobby(user)) {
            user.setY(user.getY() + 1);
            messagingTemplate.convertAndSend("/topic/movement/lobby/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/lobby/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/lobby/west/{userName}")
    public void movementWest(@Payload User user) throws JsonProcessingException {
        if (movementService.wallWestLobby(user)) {
            user.setX(user.getX() - 1);
            messagingTemplate.convertAndSend("/topic/movement/lobby/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/lobby/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/lobby/east/{userName}")
    public void movementEast(@Payload User user) throws JsonProcessingException {
        if (movementService.wallEastLobby(user)) {
            user.setX(user.getX() + 1);
            messagingTemplate.convertAndSend("/topic/movement/lobby/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/lobby/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }
}
