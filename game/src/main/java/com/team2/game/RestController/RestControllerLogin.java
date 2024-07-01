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

    @Autowired
    private PersonService personService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom {
        if (personService.loginRequest(personLoginDTO)) {
            return ResponseEntity.ok().build();

        }
        return ResponseEntity.badRequest().build();
    }
}
