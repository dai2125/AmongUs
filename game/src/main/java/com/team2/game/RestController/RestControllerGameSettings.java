package com.team2.game.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerGameSettings {

    @PostMapping("/gameSettings")
    public void gameSettings() {}
}
