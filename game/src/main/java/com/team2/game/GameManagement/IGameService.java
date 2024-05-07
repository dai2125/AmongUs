package com.team2.game.GameManagement;

import com.team2.game.DataModel.Game;
import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;

public interface IGameService {

    boolean createGame(GameDTO gameDTO) throws ResponseStatusExceptionCustom;
    boolean gameSettings(GameDTO gameDTO) throws ResponseStatusExceptionCustom;
}
