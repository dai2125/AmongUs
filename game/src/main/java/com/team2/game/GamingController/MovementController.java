package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
//import com.example.messagingstompwebsocket.chat.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.HashMap;

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
    @Autowired
    private GameInstance gameInstance;

    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) {
        try {
            messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.
                    disconnectUser(event.getSessionId())));
            logger.info("User disconnected: {}", event.getUser());
        } catch (JsonProcessingException e) {
            logger.error("Error processing UserDisconnect JSON: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error at UserDisconnect occurred: {}", e.getMessage());
        }
    }

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        UserRegisterDTO registeredUser = registerService.registerUser(user, simpMessageHeaderAccessor);
        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registeredUser));

        for(User u : registerService.getGroupManager().getGameInstance(registeredUser.getGameId()).getUserList()) {
                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));
            }
            if(registerService.startGame && !registerService.sendAlready) {
                try {
                    // Sleep for a specified duration, e.g., 2 seconds (2000 milliseconds)
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    // Handle the interruption
                    Thread.currentThread().interrupt();
                    // Log or handle the exception as necessary
                    System.out.println("Thread was interrupted: " + e.getMessage());
                }
                messagingTemplate.convertAndSend("/topic/startGame/" + user.getGameId(), "test");

                registerService.sendAlready = true;
            }
    }

    @MessageMapping("/taskResolved/")
    public void taskResolved(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("Hello from taskResolved " + user.getGameId());
        boolean crewmatesWon = registerService.taskResolved(user.getGameId());
        if (crewmatesWon){
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            messagingTemplate.convertAndSend("/topic/crewmateWins/" + user.getGameId(), crewmatesWon);
        }else {
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            System.out.println("Hello after sending task resolved");
        }

    }


    @MessageMapping("/tryConnect/")
    public void tryConnect() throws JsonProcessingException {
        System.out.println("Hello from tryConnect");
        messagingTemplate.convertAndSend("/topic/tryConnect/", gameInstance.groupIsFull());

    }

    @MessageMapping("/gimmework/")
    public void processGimmeWork(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("Hello from GIMMEWORK");
        System.out.println("USERNAME " + user.getSessionId());
        TaskDTO task = registerService.getTask();
        System.out.println("GGGG " + task.getRole());
        messagingTemplate.convertAndSend("/topic/gimmework/" + user.getSessionId(), new ObjectMapper().writeValueAsString(task));

    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
//        registerService.updatePlayerPosition(user);
//        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));

        if (movementService.wallCollision2(user)) {
            registerService.updatePlayerPosition(user);
            System.out.println("USER: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(user));
        }
    }

//    @MessageMapping("movement/{userName}")
//    public void processMovement2(@Payload User user) throws JsonProcessingException {
//        System.out.println("USER: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
//
//        if (movementService.wallCollision2(user)) {
//            messagingTemplate.convertAndSend("/topic/movement/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
////            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(user));
//
//        }
//    }

    @MessageMapping("movement/east/{userName}")
    public void processMovementEast(@Payload User user) throws JsonProcessingException {
        System.out.println("USER: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());

        messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(movementService.wallCollisionEast(user)));

//        if(movementService.wallEast(user)) {
//            registerService.updatePlayerPosition(user);
//            UserMovementDTO userMovementDTO = new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX() + 1, user.getY());
//            messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(userMovementDTO));
//        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallEast(user)));
//        }
    }



    @MessageMapping("/task/{userId}")
    @SendTo("/topic/task/{userId}")
    public void processAction(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
//        messagingTemplate.convertAndSend("/topic/task/" + user.getUserName(), new ObjectMapper().writeValueAsString("check"));

        // TODO
        for (User u : registerService.userList) {
            messagingTemplate.convertAndSend("/topic/task/" + u.getUserName(), new ObjectMapper().writeValueAsString("task"));
        }

        registerService.removeTask("task");

        if(registerService.allTasksAreSolved()) {
            System.out.println("CREWMATES WIN");
            messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
        }
    }

    @MessageMapping("/kill/{userName}")
    public void processKill(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        for(User u : registerService.userList) {
            if(!u.getSessionId().equals(user.getSessionId())) {
                if (u.getY() == user.getY() + 1 || u.getY() == user.getY() - 1 || u.getY() == user.getY() && u.getX() == user.getX() + 1 || u.getX() == user.getX() - 1 ||  u.getY() == user.getY()) {
                    messagingTemplate.convertAndSend("/topic/kill/" + user.getUserName(), new ObjectMapper().writeValueAsString("kill"));
                    messagingTemplate.convertAndSend("/topic/dead/" + u.getUserName(), new ObjectMapper().writeValueAsString("dead"));

                    messagingTemplate.convertAndSend("/topic/someoneGotKilled/", new ObjectMapper().writeValueAsString(u.getSessionId()));
                }
            }
            registerService.crewmateDied(u);
        }

        if(registerService.areAllCrewmatesDead()) {
            System.out.println("IMPOSTOR WINS");
            messagingTemplate.convertAndSend("/topic/impostorWins/", new ObjectMapper().writeValueAsString("impostorWins"));

            for(User u : registerService.userList) {
                messagingTemplate.convertAndSend("/topic/disconnected/" + u.getUserName(), new ObjectMapper().writeValueAsString("dead"));
            }
        }
    }



    @MessageMapping("/yourAGhostNow/")
    public void processGhost(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/yourAGhostNow/", new ObjectMapper().writeValueAsString("ghost"));

    }

    @MessageMapping("/reportButtonPressed/{userName}")
    public void reportButtonPressed(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/votingActive/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
    }

    public HashMap<String, Integer> votingList = new HashMap<>();
    int counter = 0;
    boolean votingActive = false;
    int votingCounter = 0;

    @MessageMapping("/votingButtonPressed/{userName}")
    public void votingButtonPressed(@Payload User user) throws JsonProcessingException {

        // TODO if the player have the same votes and the votes are the maximum then no one gets ejected
        // TODO there must be a counter in the votingbox if someone doesnt vote it muss be called an empty vote
        System.out.println("VOTING BUTTON PRESSED: " + user.getAction());
        System.out.println("UserList: " + registerService.userList.size() + " " + registerService.userList);


        if(votingList.containsKey(user.getAction())) {
            votingList.compute(user.getAction(), (k, counter) -> counter + 1);
        } else {
            votingList.put(user.getAction(), 1);
        }

        if(!votingActive) {
            counter = registerService.userList.size();
            votingActive = true;
        }

        counter--;

        if(counter == 0) {
            int max = 0;
            String maxKey = "";
            for(String key : votingList.keySet()) {
                if(votingList.get(key) > max) {
                    max = votingList.get(key);
                    maxKey = key;

                }
            }
            System.out.println("MAX: " + max + " MAXKEY: " + maxKey);

            for(int i = 0; i < registerService.userList.size(); i++) {
                if(registerService.userList.get(i).getUserName().equals(maxKey)) {
                    registerService.userList.remove(i);
                }
            }

            System.out.println("USERLIST SIZE: " + registerService.userList.size() +  " " + registerService.userList);

            votingList.clear();
            votingActive = false;
            counter = registerService.userList.size();

            if(registerService.userList.size() == 2) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/impostorWins/", new ObjectMapper().writeValueAsString("impostorWins"));
            } else {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/someoneGotEjected/", new ObjectMapper().writeValueAsString(maxKey));
            }
        }



    }
}
