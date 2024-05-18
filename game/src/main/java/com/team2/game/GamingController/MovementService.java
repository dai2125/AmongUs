package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.team2.game.DataTransferObject.UserMovementDTO;
import com.team2.game.Map.DefaultMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

@Service
public class MovementService {

    private static final DefaultMap defaultMap = new DefaultMap();

    public UserMovementDTO wallCollision(User user) throws JsonProcessingException {
        if(user.getAction().equals(Actions.UP.getAction()) && !DefaultMap.isWall(user.getY() - 1, user.getX())) {
            user.setY(user.getY() - 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        } else if(user.getAction().equals(Actions.DOWN.getAction()) && !DefaultMap.isWall(user.getY() + 1, user.getX())) {
            user.setY(user.getY() + 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        } else if(user.getAction().equals(Actions.LEFT.getAction()) && !DefaultMap.isWall(user.getY(), user.getX() - 1)) {
            user.setX(user.getX() - 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        } else if(user.getAction().equals(Actions.RIGHT.getAction()) && !DefaultMap.isWall(user.getY(), user.getX() + 1)) {
            user.setX(user.getX() + 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        }
        return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
    }

    public boolean wallCollision2(User user) {
        if(user.getAction().equals(Actions.UP.getAction()) && !DefaultMap.isWall(user.getY() - 1, user.getX())) {
            user.setY(user.getY() - 1);
            return true;
        } else if(user.getAction().equals(Actions.DOWN.getAction()) && !DefaultMap.isWall(user.getY() + 1, user.getX())) {
            user.setY(user.getY() + 1);
            return true;
        } else if(user.getAction().equals(Actions.LEFT.getAction()) && !DefaultMap.isWall(user.getY(), user.getX() - 1)) {
            user.setX(user.getX() - 1);
            return true;
        } else if(user.getAction().equals(Actions.RIGHT.getAction()) && !DefaultMap.isWall(user.getY(), user.getX() + 1)) {
            user.setX(user.getX() + 1);
            return true;
        }
        return false;
    }

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

    public UserMovementDTO wallCollisionNorth(User user) throws JsonProcessingException {
        if (!DefaultMap.isWall(user.getY() - 1, user.getX())) {
            user.setY(user.getY() - 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        }
        return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
    }

    public UserMovementDTO wallCollisionSouth(User user) throws JsonProcessingException {
        if (!DefaultMap.isWall(user.getY() + 1, user.getX())) {
            user.setY(user.getY() + 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        }
        return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
    }

    public UserMovementDTO wallCollisionWest(User user) throws JsonProcessingException {
        if (!DefaultMap.isWall(user.getY(), user.getX() - 1)) {
            user.setX(user.getX() - 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        }
        return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
    }

    public UserMovementDTO wallCollisionEast(User user) {
        if(!DefaultMap.isWall(user.getY(), user.getX() + 1)) {
            user.setX(user.getX() + 1);
            return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
        }
        return new UserMovementDTO(user.getAction(), user.getSessionId(), user.getColor(), user.getX(), user.getY());
    }
}
