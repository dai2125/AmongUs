package com.team2.game.GameManagement;

import com.team2.game.DataModel.Game;
import com.team2.game.DataTransferObject.GameDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import com.team2.game.HttpHandling.ResponseStatusExceptionMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService implements IGameService{

    @Autowired
    private GameRepository gameRepository;
/*
    @Override
    public boolean createGame(GameDTO gameDTO) throws ResponseStatusExceptionCustom {
        try {
            Game game = this.gameRepository.findById(gameDTO.getId());
            if (game == null) {
                gameRepository.save(Game.builder().id(gameDTO.getId()).players(gameDTO.getPlayers()).imposters(gameDTO.getImposters()).crewMates(gameDTO.getCrewMates()).build());
                return true;
            }else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.GAME_ALREADY_EXISTS);
        }
    }
*/
    @Override
    public boolean gameSettings(GameDTO gameDTO) throws ResponseStatusExceptionCustom {
        if (!gameRepository.existsById(gameDTO.getId())){
            //TODO create game in a different method
           // gameRepository.save(Game.builder().id(gameDTO.getId()).players(gameDTO.getPlayers()).imposters(gameDTO.getImposters()).crewMates(gameDTO.getCrewMates()).build());
            return true;
        }else {
            gameRepository.updateGameSettings(gameDTO.getId(), gameDTO.getPlayers(), gameDTO.getImposters(), gameDTO.getCrewMates());
            return true;
        }
    }
}
