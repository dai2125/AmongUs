package com.example.messagingstompwebsocket.GamingController;

import com.example.messagingstompwebsocket.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RegisterService {

    String[] colors = {"#FF0000", "#FF8000", "#0080FF", "#FF00FF", "#FF007F", "#808080"};
    List<User> userList = new ArrayList<>();
    Random r = new Random();
    private int counter = 0;
//    private final SimpMessagingTemplate simpMessagingTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

//    public RegisterService(SimpMessagingTemplate simpMessagingTemplate) {
//        this.simpMessagingTemplate = simpMessagingTemplate;
//    }

    public RegisterService() {
    }

    public UserRegisterDTO registerUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        initializeUser(user, simpMessageHeaderAccessor);
        userList.add(user);
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(user.getAction(), user.getUserId(), user.getColor(), user.getX(), user.getY());
        resetCounter(counter);
        return userRegisterDTO;
//        messagingTemplate.convertAndSend("/topic/register/", objectMapper.writeValueAsString(userRegister));
    }

    public UserRegisterDTO updateAllUserWithTheNewUser() throws JsonProcessingException {
        for(int i = 0; i < userList.size(); i++) {
            UserRegisterDTO userRegisterDTO = new UserRegisterDTO(userList.get(i).getAction(), userList.get(i).getUserId(), userList.get(i).getColor(), userList.get(i).getX(), userList.get(i).getY());
            return userRegisterDTO;
//            messagingTemplate.convertAndSend("/topic/connected/", objectMapper.writeValueAsString(userRegister));
        }
        return null;
    }

    public UserRegisterDTO disconnectUser(String sessiondId) {
        for(User u : userList) {
            if(u.getUserId().equals(sessiondId)) {
//                u.setAction("offline");
                UserRegisterDTO userRegisterDTO = new UserRegisterDTO(u.getAction(), u.getUserId(), u.getColor(), u.getX(), u.getY());

                userList.remove(u);
                return userRegisterDTO;
            }
        }
        return null;
    }

    private void resetCounter(int currentCounter) {
        if(currentCounter == colors.length - 1) {
            counter = 0;
        }
    }

    private void initializeUser(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if(user.getUserId().isEmpty()) {
            user.setAction("null");
            user.setUserId(simpMessageHeaderAccessor.getSessionId());
            user.setColor(colors[counter++]);
            user.setY(r.nextInt(5) + 2);
            user.setX(r.nextInt(5) + 2);
        }
    }
}
