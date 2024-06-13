package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.team2.game.DataTransferObject.UserMovementDTO;
import com.team2.game.Map.DefaultLobby;
import com.team2.game.Map.DefaultMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

@Service
public class MovementService {

    private static final DefaultMap defaultMap = new DefaultMap();
    private static final DefaultLobby defaultLobby = new DefaultLobby();

    public boolean wallNorth(User user) {
        if(!DefaultMap.isWall(user.getY() - 1, user.getX())) {
//            user.setY(user.getY() - 1);
            return true;
        }
        return false;
    }

    public boolean wallSouth(User user) {
        if(!DefaultMap.isWall(user.getY() + 1, user.getX())) {
//            user.setY(user.getY() + 1);
            return true;
        }
        return false;
    }

    public boolean wallWest(User user) {
        if(!DefaultMap.isWall(user.getY(), user.getX() - 1)) {
//            user.setX(user.getX() - 1);
            return true;
        }
        return false;
    }

    public boolean wallEast(User user) {
        if(!DefaultMap.isWall(user.getY(), user.getX() + 1)) {
//            user.setX(user.getX() + 1);
            return true;
        }
        return false;
    }

    public boolean wallNorthLobby(User user) {
        if(!DefaultLobby.isWall(user.getY() - 1, user.getX())) {
//            user.setY(user.getY() - 1);
            return true;
        }
        return false;
    }

    public boolean wallSouthLobby(User user) {
        if(!DefaultLobby.isWall(user.getY() + 1, user.getX())) {
//            user.setY(user.getY() + 1);
            return true;
        }
        return false;
    }

    public boolean wallWestLobby(User user) {
        if(!DefaultLobby.isWall(user.getY(), user.getX() - 1)) {
//            user.setX(user.getX() - 1);
            return true;
        }
        return false;
    }

    public boolean wallEastLobby(User user) {
        if(!DefaultLobby.isWall(user.getY(), user.getX() + 1)) {
//            user.setX(user.getX() + 1);
            return true;
        }
        return false;
    }
}
