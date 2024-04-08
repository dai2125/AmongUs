package com.example.messagingstompwebsocket.DataModel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {

    @Id
    private String sessionId;
    private String action;
    private String userId;

    private String color;
    private int x;
    private int y;
    private boolean connected;


    public User() {
    }

    public User(String sessionId, String action, String userId, String color, int x, int y) {
        this.sessionId = sessionId;
        this.action = action;
        this.userId = userId;
        this.color = color;
        this.x = x;
        this.y = y;
        this.connected = true;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
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

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
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
