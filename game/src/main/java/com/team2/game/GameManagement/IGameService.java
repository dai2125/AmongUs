package com.team2.game.GameManagement;

import com.team2.game.DataModel.Game;
import com.team2.game.DataTransferObject.GameDTO;

public interface IGameService {

    boolean gameSettings(GameDTO gameDTO);
}
