package com.example.messagingstompwebsocket.RestController;

import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
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
    // TODO missed one layer
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody PersonLoginDTO personLoginDTO) {
        if(personService.loginRequest(personLoginDTO)) {
            return ResponseEntity.ok(ResponseStatusSuccesMessage.USER_LOG_IN.getMessage());
        }
        return ResponseEntity.badRequest().body(ResponseStatusExceptionMessage.USER_NOT_FOUND.getMessage());
    }
}
