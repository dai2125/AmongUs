package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.PersonSignUpDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionCustom;
import org.springframework.web.server.ResponseStatusException;

public interface IPersonService {
    boolean signUpRequest(PersonSignUpDTO personSignUpDTO) throws ResponseStatusException, ResponseStatusExceptionCustom;

    boolean loginRequest(PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom;
}
