package com.team2.game.RestController;

import com.team2.game.DataTransferObject.PersonSignUpDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import com.team2.game.PersonManagement.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerSignUp {

    private final IPersonService personService;

    @Autowired
    public RestControllerSignUp(IPersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@RequestBody PersonSignUpDTO personSignUpDTO) throws ResponseStatusExceptionCustom {
        if (personService.signUpRequest(personSignUpDTO)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }
}
