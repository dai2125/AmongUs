package com.example.messagingstompwebsocket.HttpHandling;

import org.springframework.http.HttpStatus;

public class ResponseStatusExceptionCustom extends RuntimeException {

    private final HttpStatus _status;

    public ResponseStatusExceptionCustom(ResponseStatusExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
        _status = exceptionMessage.getStatus();
    }

    public ResponseStatusExceptionCustom(ResponseStatusExceptionMessage exceptionMessage, Throwable cause) {
        super(exceptionMessage.getMessage(), cause);
        _status = exceptionMessage.getStatus();
    }

    public HttpStatus getStatus() {
        return _status;
    }
}
