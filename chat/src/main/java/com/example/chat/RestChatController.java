package com.example.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestChatController {

    ChatService chatService = new ChatService();

    @PostMapping("/chat/ingoing/{userId}")
//    @MessageMapping("/chat/outgoing")
    public ResponseEntity<?> chatMessage(@RequestBody Message message) {

//        message.setMessage(chatService.processMessage(message));
        return ResponseEntity.ok(message);
    }
}
