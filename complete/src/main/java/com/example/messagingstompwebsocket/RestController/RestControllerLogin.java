package com.example.messagingstompwebsocket.RestController;

import com.example.messagingstompwebsocket.DataTransferObject.LoginDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusSuccesMessage;
import com.example.messagingstompwebsocket.PersonManagement.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerLogin {

    private final IPersonService personService;

    @Autowired
    public RestControllerLogin(IPersonService personService) {
        this.personService = personService;
    }

    // TODO Exception with wrong Postman parameters not catched
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
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
