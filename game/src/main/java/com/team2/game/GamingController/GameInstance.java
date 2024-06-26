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

    int random;

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
        int tasksToRemove = 0;

        if (!user.getTasks().getTask1().isEmpty()){
            tasksToRemove++;
        }
        if (!user.getTasks().getTask2().isEmpty()){
            tasksToRemove++;
        }
        if (!user.getTasks().getTask3().isEmpty()){
            tasksToRemove++;
        }
        System.out.println("TASKS TO REMOVE : " + tasksToRemove);
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
        random = (int) (Math.random() * userList.size());
        userList.get(random).setImpostor();
        System.out.println("PLAYER : " + random+1 + " will be the imposter");
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

    public void distributeTasks() {
        Set<Integer> usedIndices = new HashSet<>();
        int taskIndex;

        for (User u : userList) {
            TaskDTO taskDTO = new TaskDTO();

            if (!u.getImpostor()) {
                taskDTO.setRole("Crewmate");
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
                    System.out.println("distribute task taskcounter: " + taskCounter);
                }
            } else {
                taskDTO.setRole("Impostor");
                impostor = true;
                taskDTO.setTask1("Kill");
                taskDTO.setTask2("Sabotage");
                taskDTO.setTask3("Vent");
            }

            u.setTasks(taskDTO);
            System.out.println("Assigned tasks to user: " + u.getUserName() + " with role: " + taskDTO.getRole());
        }

        counter++;
        System.out.println("Total users assigned tasks: " + userList.size());
    }


    public void distributeTask(User u) {
        Set<Integer> usedIndices = new HashSet<>();
        int taskIndex;

        if (!u.getImpostor()) {
            taskDTO.setRole("Crewmate");
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
            taskDTO.setRole("Impostor");
            impostor = true;
            taskDTO.setTask1("Kill");
            taskDTO.setTask2("Sabotage");
            taskDTO.setTask3("Vent");
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
        taskResolvedCounter--;
        if (taskResolvedCounter > 0) {
            return false;
        } else {
            return true;
        }
    }

}
