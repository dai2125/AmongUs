package com.team2.game.RestController;

import com.team2.game.DataTransferObject.ChangeDetailDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionMessage;
import com.team2.game.HttpHandling.ResponseStatusSuccesMessage;
import com.team2.game.PersonManagement.IPersonService;
import com.team2.game.PersonManagement.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerAccountDetails {

    @Autowired
    private PersonService personService;

    @PostMapping("/accountDetails")
    public ResponseEntity<String> accountDetails(@RequestBody ChangeDetailDTO changeDetailDTO) {
        if (personService.changeAccountDetail(changeDetailDTO)) {
            return ResponseEntity.ok(ResponseStatusSuccesMessage.USER_CHANGED_ACCOUNT_DETAILS.getMessage());
        }
        return ResponseEntity.badRequest().body(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS.getMessage());
    }
}
