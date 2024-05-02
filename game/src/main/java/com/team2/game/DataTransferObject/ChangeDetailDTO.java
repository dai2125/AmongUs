package com.team2.game.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChangeDetailDTO {

    private String oldName;
    private String oldPassword;
    private String newName;
    private String newEmail;
    private String newPassword;
    private String passwordConfirm;

}
