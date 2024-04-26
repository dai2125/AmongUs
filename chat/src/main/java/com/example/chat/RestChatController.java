package com.example.chat;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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
