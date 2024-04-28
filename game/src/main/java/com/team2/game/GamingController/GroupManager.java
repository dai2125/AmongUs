package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class GroupManager {

    private static final String TASK1 = "task1";
    private static final String TASK2 = "task2";
    private static final String TASK3 = "task3";
    private static final String TASK4 = "task4";
    private static final String TASK5 = "task5";
    private static final String TASK6 = "task6";
    private static final String TASK7 = "task7";
    private static final String TASK8 = "task8";
    private static final String TASK9 = "task9";

    private static final int GROUP_FULL = 2;

    private List<User> userList = new ArrayList<>();
    private List<String> taskList = Arrays.asList(TASK1, TASK2, TASK3, TASK4, TASK5, TASK6, TASK7, TASK8, TASK9);

    public void addToTheGroup(User user) {
        userList.add(user);
    }

    public void removeFromTheGroup(User user) {
        userList.remove(user);
    }

    public List<User> getUserList() {
        return userList;
    }

    public List<User> userListExceptTheSender(User user) {
        List<User> tempUserList = new ArrayList<>();
        for(User u : userList) {
            if(!u.equals(user)) {
                tempUserList.add(u);
            }
        }
        return tempUserList;
    }

    public void clearGroup() {
        userList.clear();
    }

    public boolean isUserInGroup(User user) {
        return userList.contains(user);
    }

    public void setTheImposter() {
        int random = (int) (Math.random() * userList.size());
        userList.get(random).setImpostor();
    }

    public boolean groupIsFull() {
        if(userList.size() == GROUP_FULL) {
            return true;
        }
        return false;
    }

    public void distributeTaskToUser() {
        for(int i = 0; i < userList.size(); i++) {
            int random = (int) (Math.random() * taskList.size());
            if(!userList.get(i).getImpostor() && userList.get(i).getTaskSize() < 3) {
                userList.get(i).setTask(taskList.get(random));
                taskList.remove(random);
            }
        }
    }
}
