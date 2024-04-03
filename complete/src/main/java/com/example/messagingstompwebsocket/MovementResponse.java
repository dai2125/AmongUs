package com.example.messagingstompwebsocket;

public class MovementResponse {

    private String userId;
    private String action;
    private String color;
    private int x;
    private int y;

    public MovementResponse() {
    }

    public MovementResponse(String userId, String action, String color, int x, int y) {
        this.userId = userId;
        this.action = action;
        this.color = color;
        this.x = x;
        this.y = y;
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
}
