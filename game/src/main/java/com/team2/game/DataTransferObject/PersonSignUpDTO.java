package com.team2.game.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonSignUpDTO {

    private String name;
    private String email;
    private String password;
    private String passwordConfirm;

}
