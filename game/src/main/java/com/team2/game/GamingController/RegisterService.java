package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class RegisterService {

    String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    List<User> userList = new ArrayList();
    Random r = new Random();
    private int counter = 0;
    private ObjectMapper objectMapper = new ObjectMapper();
    public boolean startGame = false;
    public boolean sendAlready = false;
    private int random;
    private String gameID;
    int positionCounter = 0;
    int[] arrayY = {12, 11, 18, 19, 23, 24, 25};
    int[] arrayX = {14, 32, 18, 68, 47, 4, 27};

    private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);

    @Autowired
    private GameInstance gameInstance;

    @Autowired
    private GroupManager groupManager;

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try {
            //TODO create game for Private Game
            if (!user.getGameId().isEmpty()){

                System.out.println("Hello from Private Game " + user.getGameId());
                gameID = user.getGameId();
                if (!groupManager.gameExists(gameID)){
                    sendAlready = false;
                    startGame = false;
                    groupManager.createNewPrivateGame(gameID);
                    random = (int) (Math.random() * groupManager.getGameInstance(gameID).getGroupSize())+1;
                }else {
                    gameInstance = groupManager.getGameInstance(gameID);
                }
            } else {
                if (userList.size() == 0) {
                    sendAlready = false;
                    startGame = false;
                    //create new game instance and give gameId.
                    gameID = groupManager.createNewGame();
                    random = (int) (Math.random() * groupManager.getGameInstance(gameID).getGroupSize())+1;
                    System.out.println("Hello from Public game: " + gameID);
                }
            }

            // retrieve the game instance from the group manager
            gameInstance = groupManager.getGameInstance(gameID);

            UserRegisterDTO userRegisterDTO  = new UserRegisterDTO();
            if (!gameInstance.groupIsFull()){
                initializeUser(user, simpMessageHeaderAccessor);
                userList.add(user);
                userRegisterDTO.setUserName(user.getUserName());
                userRegisterDTO.setAction(user.getAction());
                userRegisterDTO.setSessionId(user.getSessionId());
                userRegisterDTO.setColor(user.getColor());
                userRegisterDTO.setX(user.getX());
                userRegisterDTO.setY(user.getY());

                //TODO set the game id for this user
                System.out.println("Initializing userDto BEFORE");
                userRegisterDTO.setGameId(user.getGameId());
                System.out.println("Initializing userDto AFTER");
                System.out.println(userRegisterDTO.getUserName()+" " + userRegisterDTO.getGameId());
                resetCounter(counter);

                /*if (gameInstance.getGroupSize() == random){
                    user.setImpostor();
                }*/
                gameInstance.addToTheGroup(user);
                //gameInstance.distributeTask(user);
            }
            System.out.println("this users id is : " + userRegisterDTO.getSessionId() + "and he belongs to game with id: " + gameID);

            if(gameInstance.groupIsFull() && !sendAlready) {
                System.out.println("game starting");
                //groupManager.setTheImposter();
                /*for (User u : userList){
                    groupManager.distributeTask(u.getSessionId());
                }*/
                //groupManager.distributeTask(u.getSessionId());
                gameInstance.setTheImposter();
                System.out.println("imposter set");
                gameInstance.distributeTasks();
                System.out.println("tasks distributed");
                startGame = true;
                userList.clear();

            }

            return userRegisterDTO;
        } catch (Exception e) {

            logger.error("An unexpected error occurred while registering User: {}", e.getMessage());
            return null;
        }
    }

    public GroupManager getGroupManager() {
        return groupManager;
    }

    public boolean isGroupFull(){
        return gameInstance.groupIsFull();
    }


    private void resetCounter(int currentCounter) {
        if(currentCounter == colors.length - 1) {
            counter = 0;
        }
    }

    private void initializeUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if(user.getSessionId().isEmpty()) {
            user.setUserName(user.getUserName());
            user.setAction("null");
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setGameId(gameID);
//            user.setColor(colors[counter++]);
//            user.setY(r.nextInt(5) + 2);
//            user.setX(r.nextInt(5) + 2); 12 14 |  11 32 | 18 18 | 19 68 | 23 47 | 24 4 | 25 27
//            user.setY(10);
//            user.setX(31);
            user.setX(arrayX[positionCounter]);
            user.setY(arrayY[positionCounter]);
            positionCounter++;
            if(positionCounter == 6) {
                positionCounter = 0;
            }
            user.setDirection(user.getDirection());
            System.out.println("User " + user.getUserName() + " get position x: " + user.getX() + " y: " + user.getY() + " positionCounter: " + positionCounter);
        }
    }


    public TaskDTO getTask() {
        return gameInstance.getTask();
    }

    public void updatePlayerPosition(User user) {
        for(User u : userList) {
            if(u.getSessionId().equals(user.getSessionId())) {
                u.setX(user.getX());
                u.setY(user.getY());
            }
        }
    }

    public boolean groupIsFull() {
        if(gameInstance.groupIsFull()) {
            return true;
        }
        return false;
    }
    public UserRegisterDTO disconnectUser(String sessionId) throws UserNotFoundException {
        for (User u : userList) {
            if (u.getSessionId().equals(sessionId)) {
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(u.getUserName(), u.getAction(), u.getSessionId(),u.getGameId(), u.getColor(), u.getX(), u.getY());
                userList.remove(u);
                gameInstance.removeFromTheGroup(u);
                return userRegisterDTO;
            }
        }
        throw new UserNotFoundException("User with sessionId " + sessionId + " not found");
    }

    public UserRegisterDTO ejectUser(String userName) {
        for (User u : userList) {
            if (u.getUserName().equals(userName)) {
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(u.getUserName(), u.getAction(), u.getSessionId(), u.getGameId(), u.getColor(), u.getX(), u.getY());
                userList.remove(u);
                groupManager.getGameInstance(gameID).removeFromTheGroup(u);
                return userRegisterDTO;
            }
        }
        return null;
    }

    public void playerDisconnected(String sessionId) {
        for (User u : userList) {
            if(u.getSessionId().equals(sessionId)) {
                userList.remove(u);
                gameInstance.removePlayerFromList(u);
            }
        }
        System.out.println("User disconnected: " + sessionId);
        System.out.println("User list size: " + userList.size());
    }


    public boolean allTasksAreSolved() {
        if(gameInstance.allTasksAreSolved()) {
            return true;
        }
        return false;
    }

    public void removeTask(String task) {
        gameInstance.removeTask(task);
    }

    public void crewmateDied(User user) {
        System.out.println("crewmate died gameID: " + gameID);
        gameInstance.removePlayerFromList(user);

    }

    public boolean areAllCrewmatesDead() {
        if(gameInstance.allCrewmatesAreDead()) {
            return true;
        }
        return false;
    }

    public class UserNotFoundException extends Exception {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public boolean taskResolved(String gameID){
        return groupManager.getGameInstance(gameID).taskResolved();
    }

}
