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

    @Autowired
    private AirSystemService airSystemService;

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);
    @Autowired
    private GameInstance gameInstance;
    @Autowired
    private GroupManager groupManager;

    private boolean votingComplete = false;

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
        String gameId = registeredUser.getGameId();
        for(User u : registerService.getGroupManager().getGameInstance(gameId).getUserList()) {
                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));
            }
            if(registerService.startGame && !registerService.sendAlready) {
                try {Thread.sleep(2000);} catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    System.out.println("Thread was interrupted: " + e.getMessage());
                }
                messagingTemplate.convertAndSend("/topic/startGame/" + user.getGameId(), "test");
                messagingTemplate.convertAndSend("/topic/startGame/", "test");

                registerService.sendAlready = true;
            }
    }

    @MessageMapping("/taskResolved/")
    public void taskResolved(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("Hello from taskResolved " + user.getGameId());
        boolean crewmatesWon = registerService.taskResolved(user.getGameId());

        registerService.removeTask("task");

        if(registerService.allTasksAreSolved()) {
            System.out.println("CREWMATES WIN");
            messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
        } else if (crewmatesWon) {
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            messagingTemplate.convertAndSend("/topic/crewmateWins/" + user.getGameId(), crewmatesWon);
        } else {
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

    @MessageMapping("/gimmework/{userName}")
    public void processGimmeWork(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        String gameId = user.getGameId();

        for (User u : groupManager.getGameInstance(gameId).getUserList()){
            TaskDTO tasks = u.getTasks();
            System.out.println("Hello from GIMMEWORK, The user " +u.getUserName() + " is " + u.getTasks().getRole() );
            messagingTemplate.convertAndSend("/topic/gimmework/" + u.getUserName(), new ObjectMapper().writeValueAsString(tasks));
        }
        /*
        System.out.println("Hello from GIMMEWORK");
        System.out.println("USERNAME " + user.getSessionId());
        TaskDTO task = registerService.getTask();
        System.out.println("GGGG " + task.getRole());
        messagingTemplate.convertAndSend("/topic/gimmework/" + user.getUserName(), new ObjectMapper().writeValueAsString(task));

         */

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

                // TODO set location of dead player

                groupManager.addDeadPlayerPosition(objectInteraction.getPositionDeadPlayerX(), objectInteraction.getPositionDeadPlayerY());


                messagingTemplate.convertAndSend("/topic/killButtonNotActive/" + objectInteraction.getObjectOne(), new ObjectMapper().writeValueAsString("killButtonNotActive"));
                countdownKill(objectInteraction.getObjectOne());


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



    @MessageMapping("/yourAGhostNow/{userName}")
    public void processGhost(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/yourAGhostNow/" + user.getUserName(), new ObjectMapper().writeValueAsString("ghost"));

    }

    @MessageMapping("/reportButtonPressed/{userName}")
    public void reportButtonPressed(@Payload User user) throws JsonProcessingException {
        // TODO wrong name is send, the victim must be send not the reporter
        messagingTemplate.convertAndSend("/topic/votingActive/", new ObjectMapper().writeValueAsString((user.getUserName())));
        countdownVoting();
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
        System.out.println("UserList: " + groupManager.getGameInstance(user.getGameId()).getUserList().size() + " " + groupManager.getGameInstance(user.getGameId()).getUserList());

        if(votingList.containsKey(user.getAction())) {
            votingList.compute(user.getAction(), (k, counter) -> counter + 1);
        } else {
            votingList.put(user.getAction(), 1);
        }

        if(!votingActive) {
            counter = groupManager.getGameInstance(user.getGameId()).getUserList().size();
            votingActive = true;
        }

        counter--;

        if(counter == 0) {
            votingComplete = true;
            int max = 0;
            String maxKey = "";
            for(String key : votingList.keySet()) {
                if(votingList.get(key) > max) {
                    max = votingList.get(key);
                    maxKey = key;

                }
            }

            System.out.println("MAX: " + max + " MAXKEY: " + maxKey);

            boolean votedForImpostor = false;

            for (int i = 0; i < groupManager.getGameInstance(user.getGameId()).getUserList().size(); i++) {
                if(groupManager.getGameInstance(user.getGameId()).getUserList().get(i).getUserName().equals(maxKey) && groupManager.getGameInstance(user.getGameId()).getUserList().get(i).getImpostor())  {
                    votedForImpostor = true;
                }
            }

            for(int i = 0; i < groupManager.getGameInstance(user.getGameId()).getUserList().size(); i++) {
                if(groupManager.getGameInstance(user.getGameId()).getUserList().get(i).getUserName().equals(maxKey)) {
                    groupManager.getGameInstance(user.getGameId()).getUserList().remove(i);
                }
            }

            System.out.println("USERLIST SIZE: " + groupManager.getGameInstance(user.getGameId()).getUserList().size() +  " " + groupManager.getGameInstance(user.getGameId()).getUserList());

            votingList.clear();
            votingActive = false;
            counter = groupManager.getGameInstance(user.getGameId()).getUserList().size();


            if(maxKey == null) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/noOneGotEjected/", new ObjectMapper().writeValueAsString("noOneGotEjected"));
            } else if(votedForImpostor) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("impostorWins"));
            } else if(registerService.userList.size() == 2) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/impostorWins/", new ObjectMapper().writeValueAsString("impostorWins"));
            } else {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/someoneGotEjected/", new ObjectMapper().writeValueAsString(maxKey));
            }
        }

    }

    @MessageMapping("/movement/north/{userName}")
    public void movementNorth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallNorth(user)) {
            user.setY(user.getY() - 1);
            user.setDirection("north");
            System.out.println("movement/north/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/north/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/north/otherPlayer/", new ObjectMapper().writeValueAsString(user));

//            if (groupManager.getPositionsNearY(user.getY())) {
            if (groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY())) {

                messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));

            } else {
                messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
            }
        }
    }

    @MessageMapping("/movement/south/{userName}")
    public void movementSouth(@Payload User user) throws JsonProcessingException {
        if (movementService.wallSouth(user)) {
            user.setY(user.getY() + 1);
            user.setDirection("south");

            System.out.println("movement/south/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/south/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/south/otherPlayer/", new ObjectMapper().writeValueAsString(user));

//            if (groupManager.getPositionsNearY(user.getY())) {
            if (groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY())) {
                messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));

            } else {
                messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
            }
        }

    }

    @MessageMapping("/movement/west/{userName}")
    public void movementWest(@Payload User user) throws JsonProcessingException {
        if (movementService.wallWest(user)) {
            user.setX(user.getX() - 1);
            user.setDirection("west");

            System.out.println("movement/west/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/west/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/west/otherPlayer/", new ObjectMapper().writeValueAsString(user));

//            if (groupManager.getPositionsNearX(user.getX())) {
            if (groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY())) {
                messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));

            } else {
                messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
            }
        }

    }

    @MessageMapping("/movement/east/{userName}")
    public void movementEast(@Payload User user) throws JsonProcessingException {
        if (movementService.wallEast(user)) {
            user.setX(user.getX() + 1);
            user.setDirection("east");

            System.out.println("movement/east/: " + user.getUserName() + " x: " + user.getX() + " y: " + user.getY());
            messagingTemplate.convertAndSend("/topic/movement/east/" + user.getUserName(), new ObjectMapper().writeValueAsString(user));
            messagingTemplate.convertAndSend("/topic/movement/east/otherPlayer/", new ObjectMapper().writeValueAsString(user));

//            if (groupManager.getPositionsNearX(user.getX())) {
            if (groupManager.getPositionsNearDeadPlayer(user.getX(), user.getY())) {

                messagingTemplate.convertAndSend("/topic/deadPlayerVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerPositions"));

            } else {
                messagingTemplate.convertAndSend("/topic/deadPlayerNotVisible/" + user.getUserName(), new ObjectMapper().writeValueAsString("deadPlayerNotVisible"));
            }
        }

    }

    @MessageMapping("/airsystem/{userName}")
    public void processAirSystem(@Payload User user) throws JsonProcessingException {
        System.out.println("Air System: y: " + user.getY() + " x: " + user.getX());

        if(airSystemService.isAirSystem(user)) {
            messagingTemplate.convertAndSend("/topic/airsystem/" + user.getUserName(), new ObjectMapper().writeValueAsString(airSystemService.newPositionAirSystem(user)));
            messagingTemplate.convertAndSend("/topic/ventNotActive/" + user.getUserName(), new ObjectMapper().writeValueAsString("ventNotActive"));
//            countdownVent(user.getUserName());

        }
    }

    public void countdownVent(String userName) throws JsonProcessingException {
        for(int i = 15; i >= 0; i--) {
            try {
                Thread.sleep(1000);
                messagingTemplate.convertAndSend("/topic/ventCooldown/" + userName, new ObjectMapper().writeValueAsString(i));

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/ventActive/" + userName, new ObjectMapper().writeValueAsString("ventButtonActive"));

    }

    public void countdownVoting() throws JsonProcessingException {
        for(int i = 30; i >= 0 && !votingComplete; i--) {
            try {
                Thread.sleep(1000);
                messagingTemplate.convertAndSend("/topic/countdownVoting/", new ObjectMapper().writeValueAsString(i));

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
        votingComplete = false;
    }

    public void countdownKill(String userName) throws JsonProcessingException {
        for(int i = 15; i >= 0; i--) {
            try {
                Thread.sleep(1000);
                messagingTemplate.convertAndSend("/topic/killCooldown/" + userName, new ObjectMapper().writeValueAsString(i));

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/killButtonActive/" + userName, new ObjectMapper().writeValueAsString("killButtonActive"));

    }


}
