package com.example.messagingstompwebsocket.DataModel;

public class User {

    private String action;
    private String userId;
    private String color;
    private int x;
    private int y;

    public User() {
    }

    public User(String action, String userId, String color, int x, int y) {
        this.action = action;
        this.userId = userId;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
                "userId=" + userId + '\'' +
                ", color=" + color + '\'' +
                ", x=" + x +
                ", y=" + y +
                '}';
    }
}
