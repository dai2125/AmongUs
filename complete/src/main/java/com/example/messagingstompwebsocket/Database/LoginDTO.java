package com.example.messagingstompwebsocket.Database;

public class LoginDTO {
    private String name;
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
