package com.team2.game.GameManagement;

import com.team2.game.DataTransferObject.GameDTO;
import org.springframework.stereotype.Service;

@Service
public class GameService implements IGameService{

    @Override
    public boolean gameSettings(GameDTO gameDTO){
        return false;
    }
}
