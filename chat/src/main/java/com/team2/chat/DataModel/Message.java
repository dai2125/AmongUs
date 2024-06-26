package com.team2.chat.DataModel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Message {

    private String userName;
    private String message;
    private String color;
}
