package com.example.chat;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Message {

    private String userId;
    private String message;
}
