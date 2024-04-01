package com.example.messagingstompwebsocket;

public class User {
    private String userId;
    private String action;
//TODO    private String color;
//    private int points;

    public User() {
    }

    public User(String userId, String action) {
        this.userId = userId;
        this.action = action;
    }

    public String getUserId() {
        return userId;
    }

    public String getAction() {
        return action;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
