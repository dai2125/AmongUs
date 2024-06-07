package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class GroupManager {

    private Map<String, GameInstance> gameInstances = new HashMap<>();

    public String createNewGame() {
        String gameId = UUID.randomUUID().toString();
        GameInstance gameInstance = new GameInstance();
        gameInstances.put(gameId, gameInstance);
        return gameId;
    }

    public GameInstance getGameInstance(String gameId) {
        return gameInstances.get(gameId);
    }

    public void removeGameInstance(String gameId) {
        gameInstances.remove(gameId);
    }

    public boolean gameExists(String gameId) {
        return gameInstances.containsKey(gameId);
    }
}
