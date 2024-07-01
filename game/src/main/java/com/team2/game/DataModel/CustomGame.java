package com.team2.game.DataModel;

import lombok.*;

public class CustomGame {

    @Getter
    @Setter
    private String gameId;
    @Getter
    @Setter
    private int crewmates;
    @Getter
    @Setter
    private int imposters;

}
