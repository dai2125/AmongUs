package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.team2.game.DataTransferObject.UserMovementDTO;
import com.team2.game.Map.DefaultMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MovementService {

    private static final DefaultMap defaultMap = new DefaultMap();
    private static final Logger logger = LoggerFactory.getLogger(MovementService.class);

    public UserMovementDTO wallCollision(User user) {
        try {
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
        } catch (Exception e) {
            logger.error("Error processing JSON for Wall Collision: {}", e.getMessage());
            return null;
        }
    }

}
