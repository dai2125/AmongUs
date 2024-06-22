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

    @Autowired
    private RegisterService registerService;

    @Autowired
    private ActionService actionService;

    @Autowired
    private AirSystemService airSystemService;

    @Autowired
    private GameInstance gameInstance;

    @Autowired
    private GroupManager groupManager;

    private boolean votingComplete = false;

    private Map<String, Boolean> userVisibilityMap = new ConcurrentHashMap<>();

    @MessageMapping("/movement/north/{userName}")
    public void movementNorth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallNorth(user)) {
            System.out.println("MOVEMENT NORTH: " + user.getX() + " " + user.getY() + " " + user.getDirection() + " " + user.getUserName() + " " + user.getGameId());
            user.setY(user.getY() - 1);
            user.setDirection("north");
//            System.out.println("movement/north/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));

            boolean isDeadPlayerVisible = groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY());
            Boolean lastVisibility = userVisibilityMap.getOrDefault(user.getUserName(), null);

            if (lastVisibility == null || lastVisibility != isDeadPlayerVisible) {
                userVisibilityMap.put(user.getUserName(), isDeadPlayerVisible);

                if (isDeadPlayerVisible) {
                    messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));
                } else {
                    messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
                }
            }
        }
    }

    @MessageMapping("/movement/south/{userName}")
    public void movementSouth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallSouth(user)) {
            user.setY(user.getY() + 1);
            user.setDirection("south");

//            System.out.println("movement/south/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));

            boolean isDeadPlayerVisible = groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY());
            Boolean lastVisibility = userVisibilityMap.getOrDefault(user.getUserName(), null);

            if (lastVisibility == null || lastVisibility != isDeadPlayerVisible) {
                userVisibilityMap.put(user.getUserName(), isDeadPlayerVisible);

                if (isDeadPlayerVisible) {
                    messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));
                } else {
                    messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
                }
            }
        }
    }

    @MessageMapping("/movement/west/{userName}")
    public void movementWest(@Payload User user) throws JsonProcessingException {
        if (movementService.wallWest(user)) {
            user.setX(user.getX() - 1);
            user.setDirection("west");

//            System.out.println("movement/west/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));

            boolean isDeadPlayerVisible = groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY());
            Boolean lastVisibility = userVisibilityMap.getOrDefault(user.getUserName(), null);

            if (lastVisibility == null || lastVisibility != isDeadPlayerVisible) {
                userVisibilityMap.put(user.getUserName(), isDeadPlayerVisible);

                if (isDeadPlayerVisible) {
                    messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));
                } else {
                    messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
                }
            }
        }
    }

    @MessageMapping("/movement/east/{userName}")
    public void movementEast(@Payload User user) throws JsonProcessingException {
        if (movementService.wallEast(user)) {
            user.setX(user.getX() + 1);
            user.setDirection("east");

//            System.out.println("movement/east/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));

            boolean isDeadPlayerVisible = groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY());
            Boolean lastVisibility = userVisibilityMap.getOrDefault(user.getUserName(), null);

            if (lastVisibility == null || lastVisibility != isDeadPlayerVisible) {
                userVisibilityMap.put(user.getUserName(), isDeadPlayerVisible);

                if (isDeadPlayerVisible) {
                    messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));
                } else {
                    messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
                }
            }
        }
    }
}
