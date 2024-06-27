package com.team2.game.GamingController;

import com.team2.game.DataModel.CustomGame;
import com.team2.game.DataModel.ObjectInteraction;
import com.team2.game.DataModel.User;
//import com.example.messagingstompwebsocket.chat.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.game.Map.DefaultMap;
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
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@PropertySource("classpath:application.properties")
public class GameController {

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

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
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
            String gameId = registerService.getGroupManager().getGameBySessionId(event.getSessionId());


            messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.
                    disconnectUser(event.getSessionId())));
            counter--;
            alarmCounter--;

            logger.info("User disconnected: {}", event.getUser());
            int tasksToRemove = groupManager.getGameInstance(gameId).getTasksToRemove();
            int taskResolvedCounter = groupManager.getGameInstance(gameId).getTaskResolvedCounter();
            int imposterCount = groupManager.getGameInstance(gameId).getIMPOSTER_COUNT();
            System.out.println("TASKS TO REMOVE : " + tasksToRemove);

            for (int i = 0; i < tasksToRemove; i++) {
                messagingTemplate.convertAndSend("/topic/taskResolved/" + gameId, true);
            }
            if (taskResolvedCounter < 1){
                messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
            }
            if (imposterCount < 1){
                messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
            }

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

                airSystemStop = false;
                sabotageStop = false;

                registerService.sendAlready = true;
            }
    }

    @MessageMapping("/taskResolved/")
    public void taskResolved(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        System.out.println("Hello from taskResolved Removing TASK: " + user.getColor());
        // user.getColor contains the name of the task
        boolean crewmatesWon = registerService.taskResolved(user.getGameId(), user.getSessionId(), user.getColor());

        //registerService.removeTask("task", user.getSessionId());

        /*if(registerService.allTasksAreSolved()) {
            System.out.println("CREWMATES WIN");
            messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
        } else if (crewmatesWon) {
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            messagingTemplate.convertAndSend("/topic/crewmateWins/" + user.getGameId(), crewmatesWon);
        } else {
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            System.out.println("Hello after sending task resolved");
        }*/
       if (crewmatesWon) {
            messagingTemplate.convertAndSend("/topic/taskResolved/" + user.getGameId(), crewmatesWon);
            messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
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
            } else {
                message = 2;
            }
        } else {
            message = 0;
        }


        messagingTemplate.convertAndSend("/topic/tryConnect/",message);

    }

    @MessageMapping("/gimmework/{userName}")
    public void processGimmeWork(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        String gameId = user.getGameId();

        for (User u : groupManager.getGameInstance(gameId).getUserList()){
            TaskDTO tasks = u.getTasks();
//            System.out.println("Hello from GIMMEWORK, The user " +u.getUserName() + " is " + u.getTasks().getRole() );
            messagingTemplate.convertAndSend("/topic/gimmework/" + u.getUserName(), new ObjectMapper().writeValueAsString(tasks));
        }

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

        //registerService.removeTask("task");

        if(registerService.allTasksAreSolved()) {
            messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("crewmatesWin"));
        }
    }

    @MessageMapping("/kill/{userName}")
    public void processKill(@Payload ObjectInteraction objectInteraction, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        for(User u : registerService.getGroupManager().getGameInstance(objectInteraction.getGameId()).getUserList()) {
            if (u.getUserName().equals(objectInteraction.getObjectTwo())){

                System.out.println("Killed name: " + u.getUserName());

                messagingTemplate.convertAndSend("/topic/kill/" + objectInteraction.getObjectOne(), new ObjectMapper().writeValueAsString("kill"));
                System.out.println("KILL FUNCTION THIS PERSON MUST GET THE MESSAGE " + objectInteraction.getObjectTwo());
                messagingTemplate.convertAndSend("/topic/dead/" + objectInteraction.getObjectTwo(), new ObjectMapper().writeValueAsString("dead"));
                messagingTemplate.convertAndSend("/topic/someoneGotKilled/" + u.getGameId(), new ObjectMapper().writeValueAsString(u.getSessionId()));

                // TODO set location of dead player

                groupManager.addDeadPlayerPosition(objectInteraction.getPositionDeadPlayerX(), objectInteraction.getPositionDeadPlayerY());


                messagingTemplate.convertAndSend("/topic/killButtonNotActive/", new ObjectMapper().writeValueAsString("killButtonNotActive"));
//                countdownKill();
                for(int i = 15; i >= 0; i--) {
                    try {
                        Thread.sleep(1000);
//                messagingTemplate.convertAndSend("/topic/killCooldown/" + userName, new ObjectMapper().writeValueAsString(i));

                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        System.out.println("Thread was interrupted: " + e.getMessage());
                    }
                }
                System.out.println("KILL BUTTON ACTIVE");
                messagingTemplate.convertAndSend("/topic/killButtonActive/", new ObjectMapper().writeValueAsString("killButtonActive"));


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
        String action = user.getAction();
        System.out.println("VOTING BUTTON PRESSED: " + user.getUserName() + " voted for " + action);

        if (action != null && !action.isEmpty() && !action.equals("null")) {
            votingList.compute(action, (k, counter) -> counter == null ? 1 : counter + 1);
        }

        for(int i = 0; i < votingList.size(); i++) {
            System.out.println("VotingList Items: " +  votingList.keySet() + " " + votingList.values());
        }

        if(!votingActive) {
            counter = groupManager.getGameInstance(user.getGameId()).getUserList().size();
            votingActive = true;
        }

        counter--;
        int maxCount = 0;

        if(counter == 0) {
            votingComplete = true;
            int max = 0;
            String maxKey = "";
            for(String key : votingList.keySet()) {
                if(votingList.get(key) > max) {
                    max = votingList.get(key);
                    maxKey = key;
                    maxCount = 1;
                } else if (votingList.get(key) == max) {
                    maxCount++;
                }
            }

            if(maxCount > 1) {
                maxKey = null;
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


            if(registerService.userList.size() == 2) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/impostorWins/", new ObjectMapper().writeValueAsString("impostorWins"));
            }
            else if(maxKey == null) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/noOneGotEjected/", new ObjectMapper().writeValueAsString("noOneGotEjected"));
                countdownReportButton();

            } else if(maxKey.equals("")) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/noOneGotEjected/", new ObjectMapper().writeValueAsString("noOneGotEjected"));
                countdownReportButton();
            }
            else if(votedForImpostor) {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/crewmateWins/", new ObjectMapper().writeValueAsString("impostorWins"));
            } else {
                messagingTemplate.convertAndSend("/topic/votingNotActive/", new ObjectMapper().writeValueAsString("votingNotActive"));
                messagingTemplate.convertAndSend("/topic/someoneGotEjected/", new ObjectMapper().writeValueAsString(maxKey));
                messagingTemplate.convertAndSend("/topic/setShowReportButtonFalse/", new ObjectMapper().writeValueAsString(maxKey));
                countdownReportButton();
            }
        }

    }

    private boolean airSystemStop = false;

    @MessageMapping("/airsystem/{userName}")
    public void processAirSystem(@Payload User user) throws JsonProcessingException {
        System.out.println("Air System: y: " + user.getY() + " x: " + user.getX());

        if(airSystemService.isAirSystem(user) && !airSystemStop) {
            messagingTemplate.convertAndSend("/topic/airsystem/" + user.getUserName(), new ObjectMapper().writeValueAsString(airSystemService.newPositionAirSystem(user)));
            messagingTemplate.convertAndSend("/topic/ventNotActive/" + user.getUserName(), new ObjectMapper().writeValueAsString("ventNotActive"));
            countdownAirSystem(user.getUserName());
        }
        stopTheAirSystemFor30Seconds();
    }

    private boolean sabotageStop = false;

    @MessageMapping("/sabotage/{userName}")
    public void processSabotage(@Payload User user) throws JsonProcessingException {
//        alarmCounter = groupManager.getGameInstance(user.getGameId()).getUserList().size();
//        alarmActive = true;

        if(!sabotageStop) {

            int numberOfPlayers = groupManager.getGameInstance(user.getGameId()).getCREWMATE_COUNT();
            alarmCounter = numberOfPlayers;
            alarmActive = true;
            usersPressedSafetyButton.clear();
            messagingTemplate.convertAndSend("/topic/sabotageActive/", new ObjectMapper().writeValueAsString("sabotageActive"));


        }
    }

    private Set<String> usersPressedSafetyButton = new HashSet<>();
    private boolean alarmActive = false;
    private int alarmCounter = 0;

    @MessageMapping("/safetyButtonPressed/{userName}")
    public void processSafetyButtonPressed(@Payload User user) throws JsonProcessingException {
        System.out.println("Safety Button pressed: " + user.getUserName() + " " + user.getY() + " x: " + user.getX());

        if(alarmActive && DefaultMap.isSafe(user.getY(), user.getX())) {
            usersPressedSafetyButton.add(user.getUserName());
            System.out.println("ALARM COUNTER: " + usersPressedSafetyButton.size());
            if(usersPressedSafetyButton.size() == alarmCounter) {
                System.out.println("SABOTAGE NOT ACTIVE");
                messagingTemplate.convertAndSend("/topic/sabotageNotActive/", new ObjectMapper().writeValueAsString("sabotageNotActive"));
                alarmActive = false;

                stopTheSabotageFor300Seconds();

                for(int i = 30; i >= 0; i--) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        System.out.println("Thread was interrupted: " + e.getMessage());
                    }
                    messagingTemplate.convertAndSend("/topic/sabotageButtonCountdown/", new ObjectMapper().writeValueAsString("sabotageButtonCountdown"));

                }
                messagingTemplate.convertAndSend("/topic/sabotageButtonActive/", new ObjectMapper().writeValueAsString("sabotageButtonActive"));
            }
        }
    }


    private void countdownSabotage(User user) throws JsonProcessingException {
        System.out.println("Sabotage GROUPLIST: " + registerService.getGroupManager().getGameInstance(user.getGameId()).getUserList());

        for(User u : registerService.getGroupManager().getGameInstance(user.getGameId()).getUserList()) {
            System.out.println("Sabotage FOR LOOP: " + u.getUserName() + " " + u.getY() + " " + u.getX() + " " + u.getColor());
        }
        boolean allSafe = false;
        for(int i = 60000; i >= 0; i--) {
            try {
                Thread.sleep(1000);


                for(User u : registerService.getGroupManager().getGameInstance(user.getGameId()).getUserList()) {
                    if(DefaultMap.isSafe(u.getY(), u.getX())) {
                        System.out.print("GAMECONTROLLER SAFE: " + u.getUserName() + " is safe ");
                        allSafe = true;
                    } else {
                        allSafe = false;
                        break;
                    }
                }
                if(allSafe) {
                    messagingTemplate.convertAndSend("/topic/sabotageNotActive/", new ObjectMapper().writeValueAsString("sabotageNotActive"));

                    break;
                }


            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/sabotageNotActive/", new ObjectMapper().writeValueAsString("sabotageNotActive"));
    }


    public void countdownAirSystem(String userName) throws JsonProcessingException {
        for(int i = 15; i >= 0; i--) {
            try {
                Thread.sleep(1000);
                messagingTemplate.convertAndSend("/topic/airSystemCountdown/" + userName, new ObjectMapper().writeValueAsString(i));

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/airSystemActive/" + userName, new ObjectMapper().writeValueAsString("ventButtonActive"));

    }

    public void countdownVoting() throws JsonProcessingException {
        for(int i = 30; i >= -3 && !votingComplete; i--) {
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

    public void countdownKill() throws JsonProcessingException {
        for(int i = 15; i >= 0; i--) {
            try {
                Thread.sleep(1000);
//                messagingTemplate.convertAndSend("/topic/killCooldown/" + userName, new ObjectMapper().writeValueAsString(i));

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        System.out.println("KILL BUTTON ACTIVE");
        messagingTemplate.convertAndSend("/topic/killButtonActive/", new ObjectMapper().writeValueAsString("killButtonActive"));
    }

    private void countdownReportButton() throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/setShowReportButtonFalse/", new ObjectMapper().writeValueAsString("setShowReportButtonFalse"));

        for(int i = 30; i >= 0; i--) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        messagingTemplate.convertAndSend("/topic/setShowReportButtonTrue/", new ObjectMapper().writeValueAsString("setShowReportButtonTrue"));

    }

    private void stopTheAirSystemFor30Seconds() {
        airSystemStop = true;
        for(int i = 30; i >= 0; i--) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        airSystemStop = false;
    }

    private void stopTheSabotageFor300Seconds() {
        sabotageStop = true;
        for(int i = 300; i >= 0; i--) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread was interrupted: " + e.getMessage());
            }
        }
        sabotageStop = false;
    }
}
