package com.team2.game.RestController;

import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.GameManagement.GameService;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerGameSettings {

    private final GameService gameService;

    @Autowired
    public RestControllerGameSettings(GameService gameService) {this.gameService = gameService;}

    @PostMapping("/gameSettings")
    public ResponseEntity<Void> gameSettings(@RequestBody GameDTO gameDTO) throws ResponseStatusExceptionCustom {
        System.out.println( " crewmates: " + gameDTO.getCrewMates());
        if (gameService.gameSettings(gameDTO)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
