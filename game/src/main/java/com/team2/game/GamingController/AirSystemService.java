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

        10 110 10 111 10 112                    => 70 113 70 114
        12 29 12 30 12 31 13 29 13 30 13 31     => 69 113 69 114
        22 95 22 96                             => 67 30 67 31
        31 7 31 8 32 7 32 8                     => 54 89 54 90 55 89 55 90
        32 135 32 136                           => 48 48 48 49
        35 45 35 46                             => 44 39 44 40 45 39 45 40
        42 112 43 112 42 113 43 113             => 31 7 31 8 32 7 32 8
        43 136 42 136                           => 10 110 10 111 10 112
        44 39 44 40 45 39 45 40                 => 22 95 22 96
        48 48 48 49                             => 35 45 35 46
        54 89 54 90 55 89 55 90                 => 32 135 32 136
        67 30 67 31                             => 42 112 43 112
        69 113 69 114 70 113 70 114             => 12 29 12 30 12 31 13 29 13 30 13 31
        44 11 44 12 45 11 45 12                 => 42 136 43 136
    */
    public User newPositionAirSystem(User user) {
        if (user.getX() == 110 && user.getY() == 10 || user.getX() == 111 && user.getY() == 10 || user.getX() == 112 && user.getY() == 10) {
            user.setX(113);
            user.setY(70);
        } else if (user.getX() == 29 && user.getY() == 12 || user.getX() == 30 && user.getY() == 12 || user.getX() == 31 && user.getY() == 12 || user.getX() == 29 && user.getY() == 13 || user.getX() == 13 && user.getY() == 30 || user.getX() == 13 && user.getY() == 31) {
            user.setX(113);
            user.setY(69);
        } else if (user.getX() == 95 && user.getY() == 22 || user.getX() == 96 && user.getY() == 22) {
            user.setX(30);
            user.setY(67);
        } else if (user.getX() == 7 && user.getY() == 31 || user.getX() == 8 && user.getY() == 31 || user.getX() == 7 && user.getY() == 32 || user.getX() == 8 && user.getY() == 32) {
            user.setX(89);
            user.setY(54);
        } else if (user.getX() == 135 && user.getY() == 32 || user.getX() == 136 && user.getY() == 32) {
            user.setX(48);
            user.setY(48);
        } else if (user.getX() == 45 && user.getY() == 35 || user.getX() == 46 && user.getY() == 35) {
            user.setX(39);
            user.setY(44);
        } else if (user.getX() == 112 && user.getY() == 42 || user.getX() == 112 && user.getY() == 43 || user.getX() == 113 && user.getY() == 42 || user.getX() == 113 && user.getY() == 43) {
            user.setX(7);
            user.setY(31);
        } else if (user.getX() == 136 && user.getY() == 43 || user.getX() == 136 && user.getY() == 42) {
            user.setX(110);
            user.setY(10);
        } else if (user.getX() == 39 && user.getY() == 44 || user.getX() == 40 && user.getY() == 44 || user.getX() == 39 && user.getY() == 45 || user.getX() == 40 && user.getY() == 45) {
            user.setX(95);
            user.setY(22);
        } else if (user.getX() == 48 && user.getY() == 48 || user.getX() == 49 && user.getY() == 48) {
            user.setX(45);
            user.setY(35);
        } else if (user.getX() == 89 && user.getY() == 54 || user.getX() == 90 && user.getY() == 54 || user.getX() == 89 && user.getY() == 55 || user.getX() == 90 && user.getY() == 55) {
            user.setX(135);
            user.setY(32);
        } else if (user.getX() == 30 && user.getY() == 67 || user.getX() == 31 && user.getY() == 67) {
            user.setX(112);
            user.setY(42);
        } else if (user.getX() == 113 && user.getY() == 69 || user.getX() == 114 && user.getY() == 69 || user.getX() == 113 && user.getY() == 70 || user.getX() == 114 && user.getY() == 70) {
            user.setX(29);
            user.setY(12);
        }
        else if (user.getX() == 11 && user.getY() == 44 || user.getX() == 12 && user.getY() == 44 || user.getX() == 11 && user.getY() == 45 || user.getX() == 12 && user.getY() == 45) {
            user.setX(136);
            user.setY(42);
        }
        return user;
    }

    public boolean isAirSystem(User user) {
        return DefaultMap.isAirSystem(user.getY(), user.getX());
    }
}
