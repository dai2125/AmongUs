package com.team2.game.GamingController;

import com.team2.game.DataModel.CustomGame;
import com.team2.game.DataModel.Game;
import com.team2.game.DataModel.ObjectInteraction;
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
    @Autowired
    private GroupManager groupManager;

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
                try {Thread.sleep(2000);} catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
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
    public void tryConnect(@Payload String gameId, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("Hello from tryConnect " + gameId);
        int message;
        if (groupManager.gameExists(gameId)){
            if ( groupManager.getGameInstance(gameId).groupIsFull()){
                message = 1;
            }else {
                message = 2;
            }
        }else {
            message = 0;
        }


        messagingTemplate.convertAndSend("/topic/tryConnect/",message);

    }

    @MessageMapping("/gimmework/")
    public void processGimmeWork(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("USERNAME " + user.getSessionId());
        TaskDTO task = registerService.getTask();
        messagingTemplate.convertAndSend("/topic/gimmework/" + user.getSessionId(), new ObjectMapper().writeValueAsString(task));

    }

    @MessageMapping("/createGame/")
    public void processCreateGame(@Payload CustomGame game, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        boolean isSuccessful  = registerService.getGroupManager().createNewCustomGame(game.getGameId(), game.getCrewmates(), game.getImposters());
        messagingTemplate.convertAndSend("/topic/createGame/", isSuccessful);

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
    public void processKill(@Payload ObjectInteraction objectInteraction, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        System.out.println("KILLER: Name " + objectInteraction.getObjectOne() + " gameID: " + objectInteraction.getGameId() + " Killed : " + objectInteraction.getObjectTwo());

        for(User u : registerService.getGroupManager().getGameInstance(objectInteraction.getGameId()).getUserList()) {
            if (u.getUserName().equals(objectInteraction.getObjectTwo())){

                System.out.println("Killed name: " + u.getUserName());

                messagingTemplate.convertAndSend("/topic/kill/" + objectInteraction.getObjectOne(), new ObjectMapper().writeValueAsString("kill"));
                messagingTemplate.convertAndSend("/topic/dead/" + objectInteraction.getObjectTwo(), new ObjectMapper().writeValueAsString("dead"));
                messagingTemplate.convertAndSend("/topic/someoneGotKilled/" + u.getGameId(), new ObjectMapper().writeValueAsString(u.getSessionId()));
                registerService.crewmateDied(u);
                System.out.println("Hello After KILL OF " + objectInteraction.getObjectTwo());

                break;
            }

        }

        if(registerService.areAllCrewmatesDead()) {

            try {Thread.sleep(1000);} catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
            System.out.println("IMPOSTOR WINS");
            messagingTemplate.convertAndSend("/topic/impostorWins/" + objectInteraction.getGameId(), new ObjectMapper().writeValueAsString("impostorWins"));

            for(User u : registerService.getGroupManager().getGameInstance(objectInteraction.getGameId()).getUserList()) {
                messagingTemplate.convertAndSend("/topic/disconnected/" + u.getUserName(), new ObjectMapper().writeValueAsString("dead"));
            }
        }
    }

    /*
    @MessageMapping("/kill/{userName}")
    public void processKill(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        System.out.println("KILL: Name" + user.getUserName() + " gameID: " + user.getGameId() + " SessionId : " + user.getSessionId() + " " + user.getImpostor());

        for(User u : registerService.getGroupManager().getGameInstance(user.getGameId()).getUserList()) {
            System.out.println("AAAA Check the loop: Username : " + u.getUserName( )+ " sessionId :" + u.getSessionId());
            if(/*!u.getSessionId().equals(user.getSessionId()) !u.getImpostor()) {
                if (u.getY() == user.getY() + 1 || u.getY() == user.getY() - 1 || u.getY() == user.getY() && u.getX() == user.getX() + 1 || u.getX() == user.getX() - 1 ||  u.getY() == user.getY()) {
                    System.out.println("Killed name: " + u.getUserName());
                    String deadPlayerName = u.getUserName();
                    messagingTemplate.convertAndSend("/topic/kill/" + user.getUserName(), new ObjectMapper().writeValueAsString("kill"));
                    messagingTemplate.convertAndSend("/topic/dead/" + deadPlayerName, new ObjectMapper().writeValueAsString("dead"));
                    messagingTemplate.convertAndSend("/topic/someoneGotKilled/" + u.getGameId(), new ObjectMapper().writeValueAsString(u.getSessionId()));
                    registerService.crewmateDied(u);
                    System.out.println("Hello After KILL OF " + deadPlayerName);
                    break;
                }
            }
        }
        if(registerService.areAllCrewmatesDead()) {

            try {Thread.sleep(1000);} catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
            System.out.println("IMPOSTOR WINS");
            messagingTemplate.convertAndSend("/topic/impostorWins/" + user.getGameId(), new ObjectMapper().writeValueAsString("impostorWins"));

            for(User u : registerService.getGroupManager().getGameInstance(user.getGameId()).getUserList()) {
                messagingTemplate.convertAndSend("/topic/disconnected/" + u.getUserName(), new ObjectMapper().writeValueAsString("dead"));
            }
        }
    }  */



    @MessageMapping("/yourAGhostNow/")
    public void processGhost(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/yourAGhostNow/", new ObjectMapper().writeValueAsString("ghost"));

    }

    @MessageMapping("/reportButtonPressed/{userName}")
    public void reportButtonPressed(@Payload User user) throws JsonProcessingException {
        // TODO wrong name is send, the victim must be send not the reporter
        messagingTemplate.convertAndSend("/topic/votingActive/", new ObjectMapper().writeValueAsString((user.getUserName())));
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


            // TODO if maxKey is the impostor then convertAndSend crewmateWins
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
