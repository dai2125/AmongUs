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

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

//        public ChatController(SimpMessagingTemplate messagingTemplate) {
//            this.messagingTemplate = messagingTemplate;
//        }

    @Autowired
    private ChatService chatService;

    RestChatController restChatController = new RestChatController();

    @MessageMapping("/ingoing/")
    @SendTo("topic/ingoing/")
    public void ingoing(@Payload Message message) {
        chatService.processMessage(message);
        messagingTemplate.convertAndSend("/topic/ingoing/", message);

//            message.setMessage(restChatController.sendToWebService(message.getMessage()));
//            System.out.println("ChatController: " + message.getMessage());
    }

    @MessageMapping("/ingoing/{userId}")
    public void ingoingUserId(@Payload Message message, @DestinationVariable String userId) {
        chatService.processMessage(message);
//        messagingTemplate.convertAndSend(String.format("/topic/ingoing/%s", userId), message);
//        messagingTemplate.convertAndSend("/topic/ingoing/", message);

        message.setMessage(restChatController.sendToWebService(message.getMessage()));
//        System.out.println("ChatController: " + message.getMessage() + " " + message.getColor());
        messagingTemplate.convertAndSend(String.format("/topic/ingoing/%s", userId), message);
        messagingTemplate.convertAndSend("/topic/ingoing/", message);
    }
}
