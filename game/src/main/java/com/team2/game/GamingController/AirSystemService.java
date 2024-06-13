package com.team2.game.GamingController;

import com.team2.game.Map.DefaultMap;
import org.springframework.stereotype.Service;

@Service
public class AirSystemService {

    private static final DefaultMap defaultMap = new DefaultMap();

    public boolean isAirSystem(int y, int x) {
        return DefaultMap.isAirSystem(y, x);
    }

}
