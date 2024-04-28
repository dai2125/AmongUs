package com.team2.game.PersonManagement;

import com.team2.game.DataTransferObject.PersonLoginDTO;
import com.team2.game.DataTransferObject.PersonSignUpDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import org.springframework.web.server.ResponseStatusException;

public interface IPersonService {
    boolean signUpRequest(PersonSignUpDTO personSignUpDTO) throws ResponseStatusException, ResponseStatusExceptionCustom;

    boolean loginRequest(PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom;
}
