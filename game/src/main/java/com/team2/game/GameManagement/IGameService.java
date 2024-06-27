package com.team2.game.GameManagement;

import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;

public interface IGameService {

    boolean gameSettings(GameDTO gameDTO) throws ResponseStatusExceptionCustom;
}
