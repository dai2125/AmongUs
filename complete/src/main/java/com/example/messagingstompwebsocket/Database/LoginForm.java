package com.example.messagingstompwebsocket.Database;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginForm {

    @NotNull
    @Size(min=2, max=30)
    private String name;

    @NotNull
    @Size(min=4, max=10)
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
