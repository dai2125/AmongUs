package com.team2.game.GamingController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRegisterDTO {

    private String userName;
    private String action;
    private String sessionId;
    private String gameId;
    private String color;
    private int x;
    private int y;
}
