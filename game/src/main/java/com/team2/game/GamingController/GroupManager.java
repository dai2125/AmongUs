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

    public String createNewPrivateGame(String gameId) {
        GameInstance gameInstance = new GameInstance();
        gameInstances.put(gameId, gameInstance);
        return gameId;
    }
    public boolean createNewCustomGame(String gameId, int crewmates, int imposters) {
        if (gameInstances.containsKey(gameId)) {
            return false; // Game ID is already taken
        }

        GameInstance gameInstance = new GameInstance();
        gameInstance.setCREWMATE_COUNT(crewmates);
        gameInstance.setIMPOSTER_COUNT(imposters);
        gameInstance.setGROUP_FULL(crewmates + imposters);
        System.out.println("Crewmate count: " + gameInstance.getCREWMATE_COUNT() + " Imposters: " + gameInstance.getIMPOSTER_COUNT() + " Group Full: " + gameInstance.getGROUP_FULL());

        gameInstances.put(gameId, gameInstance);
        return true; // Game created successfully
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
