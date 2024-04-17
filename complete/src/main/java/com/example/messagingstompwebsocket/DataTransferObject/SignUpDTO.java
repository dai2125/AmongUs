package com.example.messagingstompwebsocket.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignUpDTO {

    private String name;
    private String email;
    private String password;
    private String passwordConfirm;

}
