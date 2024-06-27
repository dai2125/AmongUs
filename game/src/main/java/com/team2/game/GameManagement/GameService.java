package com.team2.game.GameManagement;

import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService implements IGameService {

    @Autowired
    private GameRepository gameRepository;

    @Override
    public boolean gameSettings(GameDTO gameDTO) throws ResponseStatusExceptionCustom {
        if (!gameRepository.existsById(gameDTO.getId())) {
            return true;
        } else {
            gameRepository.updateGameSettings(gameDTO.getId(), gameDTO.getPlayers(), gameDTO.getImposters(), gameDTO.getCrewMates());
            return true;
        }
    }
}
