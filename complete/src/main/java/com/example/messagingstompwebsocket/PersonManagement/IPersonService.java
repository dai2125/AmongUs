package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.SignUpDTO;
import org.springframework.web.server.ResponseStatusException;

public interface IPersonService {
    boolean signUpRequest(SignUpDTO personSignUpDTO) throws ResponseStatusException;

    boolean loginRequest(PersonLoginDTO personLoginDTO);
}
