package com.team2.game.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserMovementDTO {

    private String action;
    private String sessionId;
    private String color;
    private int x;
    private int y;
}
