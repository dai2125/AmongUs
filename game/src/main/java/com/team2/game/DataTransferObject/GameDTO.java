package com.team2.game.DataTransferObject;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GameDTO {

    private long id;
    private int players;
    private int imposters;
    private int crewMates;

}
