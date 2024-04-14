package com.example.messagingstompwebsocket.GamingController;

public enum Actions {
    UP("ArrowUp"),
    DOWN("ArrowDown"),
    LEFT("ArrowLeft"),
    RIGHT("ArrowRight");
//    ONLINE,
//    OFFLINE

    private final String _action;

    Actions(String action) {
        _action = action;
    }

    public String getAction() {
        return _action;
    }
}
