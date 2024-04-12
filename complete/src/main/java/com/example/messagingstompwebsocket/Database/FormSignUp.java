package com.example.messagingstompwebsocket.Database;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FormSignUp {

    @NotNull
    @Size(min=2, max=30)
    private String firstName;

    @NotNull
    @Size(min=2, max=10)
    private String password;
}
