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

    private boolean impostor = false;
    int impostorIndex = (int) (Math.random() * GROUP_FULL);
    int counter = 0;

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

    public TaskDTO distributeTask() {
        TaskDTO taskDTO = new TaskDTO();
        for(int i = 0; i < taskList.size(); i++) {
            int random = (int) (Math.random() * taskList.size());
            if(i == 0) {
                taskDTO.setTask1(taskList.get(random));
            } else if(i == 1) {
                taskDTO.setTask2(taskList.get(random));
            } else if(i == 2) {
                taskDTO.setTask3(taskList.get(random));
            }
        }

        if(counter == impostorIndex && !impostor) {
            taskDTO.setRole("impostor");
            impostor = true;
            taskDTO.setTask1("kill");
            taskDTO.setTask2("sabotage");
            taskDTO.setTask3("vent");
        } else {
            taskDTO.setRole("crewmate");
        }

        counter++;
        return taskDTO;
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
