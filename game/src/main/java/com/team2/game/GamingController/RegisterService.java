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
    public boolean startGame = false;
    public boolean sendAlready = false;
    private int random;
    private String gameID;
    int positionCounter = 0;
    int[] arrayY = {12, 11, 18, 19, 23, 24, 25};
    int[] arrayX = {24, 32, 18, 68, 47, 4, 27};

    private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);

    @Autowired
    private GameInstance gameInstance;

    @Autowired
    private GroupManager groupManager;

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try {
            if (!user.getGameId().isEmpty()) {

                gameID = user.getGameId();
                if (!groupManager.gameExists(gameID)) {
                    sendAlready = false;
                    startGame = false;
                    groupManager.createNewPrivateGame(gameID);
                    random = (int) (Math.random() * groupManager.getGameInstance(gameID).getGroupSize()) + 1;
                } else {
                    gameInstance = groupManager.getGameInstance(gameID);
                }
            } else {
                if (userList.size() == 0) {
                    sendAlready = false;
                    startGame = false;
                    gameID = groupManager.createNewGame();
                    random = (int) (Math.random() * groupManager.getGameInstance(gameID).getGroupSize()) + 1;
                }
            }

            gameInstance = groupManager.getGameInstance(gameID);

            UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
            if (!gameInstance.groupIsFull()) {
                initializeUser(user, simpMessageHeaderAccessor);
                userList.add(user);
                userRegisterDTO.setUserName(user.getUserName());
                userRegisterDTO.setAction(user.getAction());
                userRegisterDTO.setSessionId(user.getSessionId());
                userRegisterDTO.setColor(user.getColor());
                userRegisterDTO.setX(user.getX());
                userRegisterDTO.setY(user.getY());

                userRegisterDTO.setGameId(user.getGameId());
                resetCounter(counter);

                gameInstance.addToTheGroup(user);
            }

            if (gameInstance.groupIsFull() && !sendAlready) {
                gameInstance.setTheImposter();
                gameInstance.distributeTasks();
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

    public boolean isGroupFull() {
        return gameInstance.groupIsFull();
    }


    private void resetCounter(int currentCounter) {
        if (currentCounter == colors.length - 1) {
            counter = 0;
        }
    }

    private void initializeUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if (user.getSessionId().isEmpty()) {
            user.setUserName(user.getUserName());
            user.setAction("null");
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setGameId(gameID);
            user.setX(arrayX[positionCounter]);
            user.setY(arrayY[positionCounter]);
            positionCounter++;
            if (positionCounter == 6) {
                positionCounter = 0;
            }
            user.setDirection(user.getDirection());
        }
    }

    public TaskDTO getTask() {
        return gameInstance.getTask();
    }

    public void updatePlayerPosition(User user) {
        for (User u : userList) {
            if (u.getSessionId().equals(user.getSessionId())) {
                u.setX(user.getX());
                u.setY(user.getY());
            }
        }
    }

    public boolean groupIsFull() {
        if (gameInstance.groupIsFull()) {
            return true;
        }
        return false;
    }

    public UserRegisterDTO disconnectUser(String sessionId) throws UserNotFoundException {

        String gameId = groupManager.getGameBySessionId(sessionId);
        GameInstance instanceToDisconnect = groupManager.getGameInstance(gameId);
        System.out.println("GameInstance: " + gameId);

        for (User u : instanceToDisconnect.getUserList()) {
            if (u.getSessionId().equals(sessionId)) {
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(u.getUserName(), u.getAction(), u.getSessionId(), u.getGameId(), u.getColor(), u.getX(), u.getY());
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
            if (u.getSessionId().equals(sessionId)) {
                userList.remove(u);
                gameInstance.removePlayerFromList(u);
            }
        }
    }

    public boolean allTasksAreSolved() {
        if (gameInstance.allTasksAreSolved()) {
            return true;
        }
        return false;
    }

    public void removeTask(String task, String sessionId) {
        gameInstance.removeTask(task, sessionId);
    }

    public void crewmateDied(User user) {
        gameInstance.removePlayerFromList(user);
    }

    public boolean areAllCrewmatesDead() {
        if (gameInstance.allCrewmatesAreDead()) {
            return true;
        }
        return false;
    }

    public class UserNotFoundException extends Exception {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public float taskResolved(String gameID, String sessionId, String task){

        return groupManager.getGameInstance(gameID).taskResolved(sessionId, task);
    }
}
