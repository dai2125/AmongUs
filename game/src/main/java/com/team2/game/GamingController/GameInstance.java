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
    private List<String> taskListCopy = new ArrayList<>(taskList);
    public HashMap<String, Integer> votingList = new HashMap<>();

    private int taskResolvedCounter = 9;

    TaskDTO taskDTO = new TaskDTO();

    private boolean impostor = false;
    int impostorIndex = (int) (Math.random() * GROUP_FULL);
    int counter = 0;

    public int getGroupSize() {
        return GROUP_FULL;
    }

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
        for (User u : userList) {
            if (!u.equals(user)) {
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
        for (int i = 0; i < userList.size(); i++) {
            System.out.println("PLAYER " + i + userList.get(i).getImpostor());
        }
    }

    public boolean groupIsFull() {
        if (userList.size() == GROUP_FULL) {
            return true;
        }
        return false;
    }

    public void distributeTask(User u) {
        Set<Integer> usedIndices = new HashSet<>();
        int taskIndex;

        if (!u.getImpostor()) {
            taskDTO.setRole("crewmate");
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
                System.out.println("distribute task taskcounter: " + taskCounter);
            }
        } else {
            taskDTO.setRole("impostor");
            impostor = true;
            taskDTO.setTask1("kill");
            taskDTO.setTask2("sabotage");
            taskDTO.setTask3("vent");
        }

        counter++;
        System.out.println(taskDTO.getRole());
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
        System.out.println("All crewmates are dead");
        return true;
    }

    public boolean allTasksAreSolved() {
        System.out.println("allTasksAreSolved: " + taskCounter);
        if (taskCounter == 0) {
            return true;
        }
//        if(taskListCopy.isEmpty()) {
//            return true;
//        }
        return false;
    }

    public void removeTask(String task) {
        System.out.println("RemoveTask: " + taskCounter);
        taskCounter--;
//        taskListCopy.remove(task);
    }

    public void removePlayerFromList(User user) {
        userList.remove(user);
    }

    public boolean taskResolved() {
        System.out.println("taskResolvedCounter before: " + taskResolvedCounter);
        taskResolvedCounter--;
        System.out.println("taskResolvedCounter after: " + taskResolvedCounter);

        if (taskResolvedCounter > 0) {
            return false;
        } else {
            return true;
        }
    }

}
