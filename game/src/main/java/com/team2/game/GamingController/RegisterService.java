package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Autowired
    private GroupManager groupManager;

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {

        initializeUser(user, simpMessageHeaderAccessor);
        userList.add(user);
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(user.getUserName(), user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        resetCounter(counter);
        groupManager.addToTheGroup(user);

        if(groupManager.groupIsFull() && !sendAlready) {
            groupManager.setTheImposter();
//            groupManager.distributeTaskToUser();
            startGame = true;
//            sendAlready = true;
        }
        return userRegisterDTO;
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
//            user.setColor(colors[counter++]);
            user.setY(r.nextInt(5) + 2);
            user.setX(r.nextInt(5) + 2);
//            user.setY(r.nextInt(14) + 2);
//            user.setX(r.nextInt(11) + 35);
//            user.setY(10);
//            user.setX(31);
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

    public boolean groupIsFull() {
        if(groupManager.groupIsFull()) {
            return true;
        }
        return false;
    }

    public void playerDisconnected(String sessionId) {
        for (User u : userList) {
            if(u.getSessionId().equals(sessionId)) {
                userList.remove(u);
            }
        }
        System.out.println("User disconnected: " + sessionId);
        System.out.println("User list size: " + userList.size());
    }

    public boolean areAllCrewmatesDead() {
        if(groupManager.allCrewmatesAreDead()) {
            return true;
        }
        return false;
    }

    public boolean allTasksAreSolved() {
        if(groupManager.allTasksAreSolved()) {
            return true;
        }
        return false;
    }

    public void removeTask(String task) {
        groupManager.removeTask(task);
    }

    public void crewmateDied(User user) {
        groupManager.removePlayerFromList(user);
        if (groupManager.getUserList().size() == 1) {
            System.out.println("IMPOSTOR WINS");
        }
    }

}
