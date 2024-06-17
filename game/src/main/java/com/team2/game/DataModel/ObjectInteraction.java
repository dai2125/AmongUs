package com.team2.game.DataModel;

import lombok.Getter;
import lombok.Setter;

public class ObjectInteraction {
    @Setter
    @Getter
    private String objectOne;
    @Setter
    @Getter
    private String objectTwo;
    @Setter
    @Getter
    private String gameId;
    @Setter
    @Getter
    private int positionDeadPlayerX;
    @Setter
    @Getter
    private int positionDeadPlayerY;
}
