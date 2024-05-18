package com.team2.game.RestController;

import com.team2.game.DataTransferObject.PersonLoginDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import com.team2.game.PersonManagement.IPersonService;
import com.team2.game.PersonManagement.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerLogin {

//    private final IPersonService personService;

    @Autowired
    private PersonService personService;

//    @Autowired
//    public RestControllerLogin(IPersonService personService) {
//        this.personService = personService;
//    }

    // TODO Exception with wrong Postman parameters not catched
    // TODO missed one layer
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom {
        if(personService.loginRequest(personLoginDTO)) {
//            return ResponseEntity.ok(ResponseStatusSuccesMessage.USER_LOG_IN.getMessage());
            return ResponseEntity.ok().build();

        }
        return ResponseEntity.badRequest().build();
    }
}
