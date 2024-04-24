package com.example.messagingstompwebsocket.HttpHandling;

import org.springframework.http.HttpStatus;

public class ResponseStatusExceptionCustom extends Exception {

    private final HttpStatus _status;

    // TODO no runtime exception and no http, no extends RuntimeException, try & catch
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
