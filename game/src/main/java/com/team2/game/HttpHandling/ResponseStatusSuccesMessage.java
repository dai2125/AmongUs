package com.team2.game.HttpHandling;

public enum ResponseStatusSuccesMessage {

    USER_CREATED("User created"),
    USER_DELETED("User deleted"),
    USER_UPDATED("User updated"),
    USER_LOG_IN("User logged in"),
    USER_LOG_OUT("User logged out"),
    USER_CHANGED_PASSWORD("User changed password");

    private final String message;

    ResponseStatusSuccesMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
