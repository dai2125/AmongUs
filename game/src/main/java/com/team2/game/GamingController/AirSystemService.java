package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.team2.game.Map.DefaultMap;
import org.springframework.stereotype.Service;

@Service
public class AirSystemService {

    private static final DefaultMap defaultMap = new DefaultMap();

    /*
        55 5                        => 23 24, 24 24
        14 6, 15 6, 14 7, 15 7      => 14 33, 15 33, 14 34, 15 34
        47 11, 48 11                => 44 27, 44 28, 45 27, 45 28
        3 16, 4 16                  => 19 22, 19 23
        67 16                       => 56 35
        22 18, 23 18                => 55 5
        27 19, 28 19, 29 19, 28 20  => 14 6, 15 6, 14 7, 15 7
        67 21, 67 22                => 3 16, 4 16
        55 21, 56 21, 55 22, 56 22  => 47 11, 48 11
        19 22, 19 23                => 67 16
        23 24, 24 24                => 22 18, 23 18
        44 27, 44 28, 45 27, 45 28  => 27 19, 28 19, 29 19, 28 20
        14 33, 14 34, 15 33, 15 34  => 47 11, 48 11
        56 35                       => 67 21, 67 22
    */

    public boolean isAirSystem(User user) {
        return DefaultMap.isAirSystem(user.getY(), user.getX());
    }

    public User newPositionAirSystem(User user) {
        if (user.getX() == 55 && user.getY() == 5) {
            user.setX(23);
            user.setY(24);
        } else if (user.getX() == 14 && user.getY() == 6 || user.getX() == 15 && user.getY() == 6 || user.getX() == 14 && user.getY() == 7 || user.getX() == 15 && user.getY() == 7) {
            user.setX(14);
            user.setY(33);
        } else if (user.getX() == 47 && user.getY() == 11) {
            user.setX(44);
            user.setY(27);
        } else if (user.getX() == 3 && user.getY() == 16 || user.getX() == 4 && user.getY() == 16) {
            user.setX(19);
            user.setY(22);
        } else if (user.getX() == 67 && user.getY() == 16) {
            user.setX(56);
            user.setY(35);
        } else if (user.getX() == 22 && user.getY() == 18 || user.getX() == 23 && user.getY() == 18) {
            user.setX(55);
            user.setY(5);
        } else if (user.getX() == 27 && user.getY() == 19 || user.getX() == 28 && user.getY() == 19 || user.getX() == 29 && user.getY() == 19 || user.getX() == 28 && user.getY() == 20) {
            user.setX(14);
            user.setY(6);
        } else if (user.getX() == 67 && user.getY() == 21 || user.getX() == 67 && user.getY() == 22) {
            user.setX(3);
            user.setY(16);
        } else if (user.getX() == 55 && user.getY() == 21 || user.getX() == 56 && user.getY() == 21 || user.getX() == 55 && user.getY() == 22 || user.getX() == 56 && user.getY() == 22) {
            user.setX(47);
            user.setY(11);
        } else if (user.getX() == 19 && user.getY() == 22 || user.getX() == 19 && user.getY() == 23) {
            user.setX(67);
            user.setY(16);
        } else if (user.getX() == 23 && user.getY() == 24 || user.getX() == 24 && user.getY() == 24) {
            user.setX(22);
            user.setY(18);
        } else if (user.getX() == 44 && user.getY() == 27 || user.getX() == 44 && user.getY() == 28 || user.getX() == 45 && user.getY() == 27 || user.getX() == 45 && user.getY() == 28) {
            user.setX(27);
            user.setY(19);
        } else if (user.getX() == 14 && user.getY() == 33 || user.getX() == 14 && user.getY() == 34 || user.getX() == 15 && user.getY() == 33 || user.getX() == 15 && user.getY() == 34) {
            user.setX(47);
            user.setY(11);
        } else if (user.getX() == 56 && user.getY() == 35) {
            user.setX(67);
            user.setY(21);
        }
        return user;
    }
}
