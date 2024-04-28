package com.team2.game.HttpHandling;

import org.springframework.http.HttpStatus;

public enum ResponseStatusExceptionMessage {

    INVALID_EMAIL("Invalid email", HttpStatus.BAD_REQUEST),
    INVALID_NAME("Invalid name", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD("Invalid password", HttpStatus.BAD_REQUEST),
    PASSWORDS_DO_NOT_MATCH("Passwords do not match", HttpStatus.BAD_REQUEST),
    PASSWORD_WRONG("Wrong password", HttpStatus.UNAUTHORIZED),
    USER_ALREADY_EXISTS("User already exists", HttpStatus.CONFLICT),
    USER_ALREADY_ONLINE("User already online", HttpStatus.CONFLICT),
    USER_NOT_FOUND("User not found", HttpStatus.NOT_FOUND);

    private final String _message;
    private final HttpStatus _status;

    ResponseStatusExceptionMessage(String message, HttpStatus status) {
        _message = message;
        _status = status;
    }

    public String getMessage() {
        return _message;
    }

    public HttpStatus getStatus() {
        return _status;
    }
}
