package com.example.messagingstompwebsocket.DataModel;

public record UserMovement(String sessionId, String action, String userId, String color, int x, int y) {
}
