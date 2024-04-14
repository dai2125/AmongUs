package com.example.messagingstompwebsocket.RestController;

import com.example.messagingstompwebsocket.DataTransferObject.LoginDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusSuccesMessage;
import com.example.messagingstompwebsocket.PersonManagement.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerLogin {

    private final PersonService personService;

    @Autowired
    public RestControllerLogin(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO loginDTO) {
        if(personService.loginRequest(loginDTO)) {
            return ResponseEntity.ok(ResponseStatusSuccesMessage.USER_LOG_IN.getMessage());
        }
        return ResponseEntity.badRequest().body(ResponseStatusExceptionMessage.USER_NOT_FOUND.getMessage());
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> logOut(@Valid @RequestBody LogOutDTO logOutDTO) {
//        if(personService.logOutRequest(logOutDTO)) {
//            return ResponseEntity.ok(ResponseStatusSuccesMessage.USER_LOG_IN.getMessage());
//        }
        // TODO another exception
//        return ResponseEntity.badRequest().body(ResponseStatusExceptionMessage.USER_NOT_FOUND.getMessage());
//    }

}
