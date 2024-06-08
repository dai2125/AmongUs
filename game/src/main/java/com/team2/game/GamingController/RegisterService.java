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

    private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);


    @Autowired
    private GameInstance gameInstance;

    @Autowired
    private GroupManager groupManager;

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try {
            if (userList.size() == 0) {
                sendAlready = false;
                startGame = false;
                //TODO create new game instance ang give gameId.
                gameID = groupManager.createNewGame();

                random = (int) (Math.random() * groupManager.getGameInstance(gameID).getGroupSize())+1;
                System.out.println("the imposter will be the " + random);
            }

            //TODO retrieve the game instance from the group manager
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
                userRegisterDTO.setGameId(user.getGameId());
                resetCounter(counter);

                if (userList.size() == random){
                    user.setImpostor();
                }
                gameInstance.addToTheGroup(user);
                gameInstance.distributeTask(user);
            }
            System.out.println("this users id is : " + userRegisterDTO.getSessionId() + "and he belongs to game with id: " + gameID);

            if(gameInstance.groupIsFull() && !sendAlready) {
                //groupManager.setTheImposter();
                /*for (User u : userList){
                    groupManager.distributeTask(u.getSessionId());
                }*/
                //groupManager.distributeTask(u.getSessionId());
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
//            user.setX(r.nextInt(5) + 2);
            user.setY(10);
            user.setX(31);
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

    public boolean areAllCrewmatesDead() {
        if(gameInstance.allCrewmatesAreDead()) {
            return true;
        }
        return false;
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
        gameInstance.removePlayerFromList(user);
        if (gameInstance.getUserList().size() == 1) {
            System.out.println("IMPOSTOR WINS");
        }
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
