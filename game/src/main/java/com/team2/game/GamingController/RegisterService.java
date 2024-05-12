package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class RegisterService {

    String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    List<User> userList = new ArrayList();
    Random r = new Random();
    private int counter = 0;
    private ObjectMapper objectMapper = new ObjectMapper();
    public boolean startGame = false;
    public boolean sendAlready = false;

    private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);

    @Autowired
    private GroupManager groupManager;

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try {
            initializeUser(user, simpMessageHeaderAccessor);
            userList.add(user);
            UserRegisterDTO userRegisterDTO = new UserRegisterDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
            resetCounter(counter);
            groupManager.addToTheGroup(user);

            if(groupManager.groupIsFull() && !sendAlready) {
                groupManager.setTheImposter();
                startGame = true;
            }
            return userRegisterDTO;
        } catch (Exception e) {

            logger.error("An unexpected error occurred while registering User: {}", e.getMessage());
            return null;
        }
    }


    public UserRegisterDTO updateAllUserWithTheNewUser() {
        try {
            for(int i = 0; i < userList.size(); i++) {
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(userList.get(i).getAction(), userList.get(i).getSessionId(), userList.get(i).getColor(), userList.get(i).getX(), userList.get(i).getY());
                return userRegisterDTO;
                //messagingTemplate.convertAndSend("/topic/connected/", objectMapper.writeValueAsString(userRegister));
            }
        } catch (Exception e) {
            logger.error("An unexpected error occurred while updating Users: {}", e.getMessage());
        }
        return null;
    }

    public UserRegisterDTO disconnectUser(String sessionId) throws UserNotFoundException {
        for (User u : userList) {
            if (u.getSessionId().equals(sessionId)) {
                //u.setAction("offline");
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(u.getAction(), u.getSessionId(), u.getColor(), u.getX(), u.getY());
                userList.remove(u);
                return userRegisterDTO;
            }
        }
        throw new UserNotFoundException("User with sessionId " + sessionId + " not found");
    }

    private void resetCounter(int currentCounter) {
        if(currentCounter == colors.length - 1) {
            counter = 0;
        }
    }

    private void initializeUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if(user.getSessionId().isEmpty()) {
            user.setAction("null");
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setColor(colors[counter++]);
            user.setY(r.nextInt(5) + 2);
            user.setX(r.nextInt(5) + 2);
        }
    }

    public TaskDTO getTask() {
        return groupManager.distributeTask();
    }

    public void updatePlayerPosition(User user) {
        for(User u : userList) {
            if(u.getSessionId().equals(user.getSessionId())) {
                u.setX(user.getX());
                u.setY(user.getY());
            }
        }
    }

    public class UserNotFoundException extends Exception {
        public UserNotFoundException(String message) {
            super(message);
        }
    }
}
