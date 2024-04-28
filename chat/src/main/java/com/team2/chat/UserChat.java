package com.team2.chat;

import com.team2.game.DataModel.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChat extends User {

    User user;
    String userName;
    String email;

    public UserChat(String userName, String email) {
        this.user = new User(userName, email);
        this.userName = userName;
        this.email = email;
    }



}
