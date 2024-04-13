package com.example.messagingstompwebsocket.HttpHandling;

public enum ResponseStatusSuccesMessage {

    USER_CREATED("User created"),
    USER_DELETED("User deleted"),
    USER_UPDATED("User updated"),
    USER_LOGGED_IN("User logged in"),
    USER_LOGGED_OUT("User logged out"),
    USER_CHANGED_PASSWORD("User changed password");

    private final String message;

    ResponseStatusSuccesMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
