package com.team2.chat;

import org.springframework.web.bind.annotation.*;

@RestController
public class RestChatController {

    ChatService chatService = new ChatService();

    @GetMapping("https://www.purgomalum.com/service/json?text={message}")
    public String sendToWebService(@PathVariable String message) {

        System.out.println("RestChatController: " + message);

        return message;
    }

}
