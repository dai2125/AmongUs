package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameInstance {

    private static final String TASK1 = "Guess the number";
    private static final String TASK2 = "Download the file";
    private static final String TASK3 = "Enter the number sequence";
    private static final String TASK4 = "Answer the question";
    private static final String TASK5 = "Memory game";
    @Setter
    @Getter
    private int GROUP_FULL = 2;
    @Setter
    @Getter
    private int IMPOSTER_COUNT = 1;
    @Setter
    @Getter
    private int CREWMATE_COUNT = 1;
    private int taskCounter = 0;
    private List<User> userList = new ArrayList<>();
    private List<String> taskList = Arrays.asList(TASK1, TASK2, TASK3, TASK4, TASK5);
    @Getter
    @Setter
    private int taskResolvedCounter = 3;
    @Getter
    private int tasksToRemove = 0;
    @Setter
    @Getter
    private float taskPercentage = (float) 1 /(3 * CREWMATE_COUNT)*100;

    TaskDTO taskDTO = new TaskDTO();

    int random;

    private boolean impostor = false;
    //int impostorIndex = (int) (Math.random() * GROUP_FULL);
    int counter = 0;


    public int getGroupSize() {
        return GROUP_FULL;
    }

    public void addToTheGroup(User user) {
        userList.add(user);
    }

    public void removeFromTheGroup(User user) {
        //userList.remove(user);
        tasksToRemove = 0;

        if (!user.getImpostor()) {
            if (!user.getTasks().getTask1().isEmpty()) {
                tasksToRemove++;
            }
            if (!user.getTasks().getTask2().isEmpty()) {
                tasksToRemove++;
            }
            if (!user.getTasks().getTask3().isEmpty()) {
                tasksToRemove++;
            }
        } else {
            IMPOSTER_COUNT--;
        }
        taskResolvedCounter -= tasksToRemove;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void clearGroup() {
        userList.clear();
    }

    public void setTheImposter() {
        random = (int) (Math.random() * userList.size());
        userList.get(random).setImpostor();
        for (int i = 0; i < userList.size(); i++) {
        }
    }

    public boolean groupIsFull() {
        if (userList.size() == GROUP_FULL) {
            return true;
        }
        return false;
    }

    public void distributeTasks() {
        Set<Integer> usedIndices = new HashSet<>();
        int taskIndex;

        for (User u : userList) {
            TaskDTO taskDTO = new TaskDTO();

            if (!u.getImpostor()) {
                taskDTO.setRole("crewmate");
                usedIndices.clear();
                for (int i = 0; i < 3; i++) {
                    do {
                        taskIndex = (int) (Math.random() * taskList.size());
                    } while (usedIndices.contains(taskIndex));
                    usedIndices.add(taskIndex);

                    switch (i) {
                        case 0:
                            taskDTO.setTask1(taskList.get(taskIndex));
                            break;
                        case 1:
                            taskDTO.setTask2(taskList.get(taskIndex));
                            break;
                        case 2:
                            taskDTO.setTask3(taskList.get(taskIndex));
                            break;
                    }
                    taskCounter++;
                }
            } else {
                taskDTO.setRole("impostor");
                impostor = true;
                taskDTO.setTask1("Kill");
                taskDTO.setTask2("Sabotage");
                taskDTO.setTask3("Vent");
            }
            u.setTasks(taskDTO);
        }
        counter++;
    }



    public TaskDTO getTask() {
        return taskDTO;
    }

    public boolean allCrewmatesAreDead() {

        for (User user : userList) {
            if (!user.getImpostor()) {
                return false;
            }
        }
        return true;
    }

    public boolean allTasksAreSolved() {
        if (taskCounter == 0) {
            return true;
        }
        return false;
    }

    public void removeTask(String task, String sessionId) {
        taskCounter--;
    }

    private int getUserIndex(String sessionId) {
        int index = 0;
        for (User user : userList) {
            if (user.getSessionId().equals(sessionId)) {
                return index;
            }
            index++;
        }
        return -1;
    }

    public void removePlayerFromList(User user) {
        //userList.remove(user);
        //do not remove the player from the list when he dies because he needs to still exist as a ghost and do tasks
    }

    public float taskResolved(String sessionId, String task) {

        int index = getUserIndex(sessionId);

        if (index == -1) {
            return 0;
        }

        for (int i = 0; i < 3; i++) {
            if (userList.get(index).getTasks().getTask1().equals(task)){

                userList.get(index).getTasks().setTask1("");
            }
            if (userList.get(index).getTasks().getTask2().equals(task)){

                userList.get(index).getTasks().setTask2("");
            }
            if (userList.get(index).getTasks().getTask3().equals(task)){

                userList.get(index).getTasks().setTask3("");
            }
        }

        taskResolvedCounter--;

        return taskPercentage;

       
    }
}
