package com.example.messagingstompwebsocket.DataModel;

public class User {

    private String action;
    private String sessionId;
    private String color;
    private int x;
    private int y;

    public User() {
    }

    public User(String action, String sessionId, String color, int x, int y) {
        this.action = action;
        this.sessionId = sessionId;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setUserId(String sessionId) {
        this.sessionId = sessionId;
    }

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
