package com.example.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class ChatController {

        private SimpMessagingTemplate messagingTemplate;

        public ChatController(SimpMessagingTemplate messagingTemplate) {
            this.messagingTemplate = messagingTemplate;
        }

        private ChatService chatService = new ChatService();

        @MessageMapping("/ingoing/")
        @SendTo("topic/ingoing/")
        public void ingoing(@Payload Message message) {
            chatService.processMessage(message);
            messagingTemplate.convertAndSend("/topic/ingoing/", message);
        }

        // TODO funktioniert nicht
//        @MessageMapping("/ingoing/{userId}")
////        @SendTo("/topic/ingoing/{userId}")
//        public void ingoingUserId(@Payload Message message, @DestinationVariable("userId") String userId) {
//            chatService.processMessage(message);
//
//            System.out.println("Ingoing userId: " + message.getMessage() + " " + message.getUserId());
////            messagingTemplate.convertAndSend("/topic/ingoing/{userId}", message);
//            messagingTemplate.convertAndSend(String.format("/topic/ingoing/%s", userId), message);
//        }

    @MessageMapping("/ingoing/{userId}")
    public void ingoingUserId(@Payload Message message, @DestinationVariable String userId) {
        chatService.processMessage(message);
        messagingTemplate.convertAndSend(String.format("/topic/ingoing/%s", userId), message);
        messagingTemplate.convertAndSend("/topic/ingoing/", message);
    }

//            messagingTemplate.convertAndSend("/topic/ingoing/", message);
        }
//}
