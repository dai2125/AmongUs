package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.PersonSignUpDTO;
import org.springframework.web.server.ResponseStatusException;

public interface IPersonService {
    boolean signUpRequest(PersonSignUpDTO personSignUpDTO) throws ResponseStatusException;

    boolean loginRequest(PersonLoginDTO personLoginDTO);
}
