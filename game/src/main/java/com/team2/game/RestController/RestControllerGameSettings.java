package com.team2.game.RestController;

import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.GameManagement.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerGameSettings {

    private final GameService gameService;

    @Autowired
    public RestControllerGameSettings(GameService gameService) {this.gameService = gameService;}

    @PostMapping("/gameSettings")
    public boolean gameSettings(@RequestBody GameDTO gameDTO) {
        return gameService.gameSettings(gameDTO);
    }
}
