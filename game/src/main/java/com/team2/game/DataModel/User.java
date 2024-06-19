package com.team2.game.DataModel;

import com.team2.game.GamingController.TaskDTO;

import java.util.ArrayList;

public class User {

    private String userName;
    private String action;
    private String sessionId;
    private String gameId;
    private String color;
    private int x;
    private int y;
    private boolean isImpostor;
    private TaskDTO tasks ;

//    private String userName;
    private String email;

    public User() {
    }

    public User(String userName, String email) {
        this.userName = userName;
        this.email = email;
    }

    public User(String userName, String action, String sessionId, String color, int x, int y) {
        this.userName = userName;
        this.action = action;
        this.sessionId = sessionId;
        this.color = color;
        this.x = x;
        this.y = y;
        this.isImpostor = false;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getSessionId() {
        return this.sessionId;
    }

    public String getGameId() {return this.gameId;}

    public void setUserId(String sessionId) {
        this.sessionId = sessionId;
    }

    public void setGameId(String gameId) {this.gameId = gameId;}

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setImpostor() {
        isImpostor = true;
    }

    public boolean getImpostor() {
        return isImpostor;
    }

    public TaskDTO getTasks() {
        return tasks;
    }
    public void setTasks(TaskDTO taskDTO) {
        this.tasks = taskDTO;
    }

    //public void setTask(String task) {tasks.add(task);}

    //public int getTaskSize() {return tasks.size();}

    @Override
    public String toString() {
        return "User{" +
                "action=" + action + '\'' +
                "sessionId=" + sessionId + '\'' +
                ", color=" + color + '\'' +
                ", x=" + x +
                ", y=" + y +
                '}';
    }

}
