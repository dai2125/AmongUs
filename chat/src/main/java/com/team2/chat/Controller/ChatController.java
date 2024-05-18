package com.team2.chat.Controller;

import com.team2.chat.DataModel.Message;
import com.team2.chat.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

//        public ChatController(SimpMessagingTemplate messagingTemplate) {
//            this.messagingTemplate = messagingTemplate;
//        }

    @Autowired
    private ChatService chatService;

    @MessageMapping("/ingoing/")
    @SendTo("topic/ingoing/")
    public void ingoing(@Payload Message message) {
        chatService.processMessage(message);
        messagingTemplate.convertAndSend("/topic/ingoing/", message);
    }

    @MessageMapping("/ingoing/{userId}")
    public void ingoingUserId(@Payload Message message, @DestinationVariable String userId) {
        message.setMessage(chatService.getSomething(message.getMessage()));

        System.out.println("ChatController: " + message.getMessage() + " " + "userId: " + userId + " " + message.getUserName());
        messagingTemplate.convertAndSend(String.format("/topic/ingoing/%s", userId), message);
        messagingTemplate.convertAndSend("/topic/ingoing/", message);
    }
}
