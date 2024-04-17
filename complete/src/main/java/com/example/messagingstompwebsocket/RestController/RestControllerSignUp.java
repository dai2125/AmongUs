package com.example.messagingstompwebsocket.RestController;

import com.example.messagingstompwebsocket.DataTransferObject.PersonSignUpDTO;
import com.example.messagingstompwebsocket.PersonManagement.IPersonService;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusSuccesMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// TODO @RequestMapping("/api")
public class RestControllerSignUp {

    private final IPersonService personService;

    @Autowired
    public RestControllerSignUp(IPersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody PersonSignUpDTO personSignUpDTO) {
        if(personService.signUpRequest(personSignUpDTO)) {
            return ResponseEntity.ok( ResponseStatusSuccesMessage.USER_CREATED.getMessage());
        }
      
        // No records only DTO´s
        // TODO must this return stay here?

        return ResponseEntity.badRequest().body(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS.getMessage());
    }
}
