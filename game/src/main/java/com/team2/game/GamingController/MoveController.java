package com.team2.game.GamingController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.game.DataModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class MoveController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MovementService movementService;

    @MessageMapping("/movement/north/{userName}")
    public void movementNorth(@Payload User user) throws JsonProcessingException {
        if (user.getColor().equals("ghost")) {
            if (movementService.wallNorthGhost(user)) {
                user.setY(user.getY() - 1);
                messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
                messagingTemplate.convertAndSend("/topic/movement/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));
            }
            return;
        }
        if (movementService.wallNorth(user)) {
//            user.setY(user.getY() - 1);
            user.setDirection("north");
            messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));

        }
    }

    @MessageMapping("/movement/south/{userName}")
    public void movementSouth(@Payload User user) throws JsonProcessingException {
        if (user.getColor().equals("ghost")) {
            if (movementService.wallSouthGhost(user)) {
                user.setY(user.getY() + 1);
                messagingTemplate.convertAndSend("/topic/movement/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
                messagingTemplate.convertAndSend("/topic/movement/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));
            }
            return;
        }

        if (movementService.wallSouth(user)) {
//            user.setY(user.getY() + 1);
            user.setDirection("south");
            messagingTemplate.convertAndSend("/topic/movement/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));
        }
    }

    @MessageMapping("/movement/west/{userName}")
    public void movementWest(@Payload User user) throws JsonProcessingException {
        if (user.getColor().equals("ghost")) {
            if (movementService.wallWestGhost(user)) {
//                user.setX(user.getX() - 1);
                messagingTemplate.convertAndSend("/topic/movement/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
                messagingTemplate.convertAndSend("/topic/movement/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));
            }
            return;
        }

        if (movementService.wallWest(user)) {
//            user.setX(user.getX() - 1);
//            user.setDirection("west");
            messagingTemplate.convertAndSend("/topic/movement/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));

        }
    }

    @MessageMapping("/movement/east/{userName}")
    public void movementEast(@Payload User user) throws JsonProcessingException {
        if (user.getColor().equals("ghost")) {
            if (movementService.wallEastGhost(user)) {
//                user.setX(user.getX() + 1);
                messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
                messagingTemplate.convertAndSend("/topic/movement/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));
            }
            return;
        }

        if (movementService.wallEast(user)) {
//            user.setX(user.getX() + 1);

            messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));
            }
        }
}
