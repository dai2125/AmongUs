package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import org.springframework.stereotype.Service;

import java.util.*;

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
        gameInstance.setTaskResolvedCounter(crewmates*3);
        System.out.println("Crewmate count: " + gameInstance.getCREWMATE_COUNT() + " Imposters: " + gameInstance.getIMPOSTER_COUNT() + " Group Full: " + gameInstance.getGROUP_FULL()+"Number Tasks: " + gameInstance.getTaskResolvedCounter());

        gameInstances.put(gameId, gameInstance);
        return true; // Game created successfully
    }

    public GameInstance getGameInstance(String gameId) {
        return gameInstances.get(gameId);
    }

    public String getGameBySessionId(String sessionId) {
        for (Map.Entry<String, GameInstance> entry : gameInstances.entrySet()) {
            for (User user : entry.getValue().getUserList()) {
                if (user.getSessionId().equals(sessionId)) {
                    System.out.println("Disconnecting " + sessionId + " from game " + entry.getKey());
                    return entry.getKey();
                }
            }
        }
        return null;
    }

    public void removeGameInstance(String gameId) {
        gameInstances.remove(gameId);
    }

    public boolean gameExists(String gameId) {
        return gameInstances.containsKey(gameId);
    }

    private List<Position> deadPlayerPositions = new ArrayList<>();
    private int range = 5;

    public void addDeadPlayerPosition(int x, int y) {
//        System.out.println("Adding dead player position");
//        System.out.println("X: " + x + " Y: " + y);
        deadPlayerPositions.add(new Position(x, y));
    }

    public boolean getPositionsNearDeadPlayer(int targetX, int targetY) {
        for (Position pos : deadPlayerPositions) {
            if (Math.abs(pos.getX() - targetX) <= range && Math.abs(pos.getY() - targetY) <= range) {
//                System.out.println("Dead player near Y");
                return true;
            } else if(Math.abs(pos.getX() + targetX) <= range && Math.abs(pos.getY() + targetY) <= range) {
//                System.out.println("Dead player near Y");
                return true;
            }
        }
//        System.out.println("Dead player not near Y");
        return false;
    }

    public boolean getPositionsNearY(int targetY) {
        for (Position pos : deadPlayerPositions) {
            if ((Math.abs(pos.getY() - targetY) <= range) || Math.abs(pos.getY() + targetY) <= range) {
//                System.out.println("Dead player near Y");

                return true;
            }
        }
//        System.out.println("Dead player not near Y");
        return false;
    }

    public boolean getPositionsNearX(int targetX) {
        for (Position pos : deadPlayerPositions) {
            if ((Math.abs(pos.getX() - targetX) <= range) || (Math.abs(pos.getX() + targetX) <= range)) {
                System.out.println("Dead player near X");
                return true;
            }
        }
        System.out.println("Dead player not near X");
        return false;
    }

    public void removeDeadPlayerPosition(Position position) {
        deadPlayerPositions.remove(position);
    }
}
