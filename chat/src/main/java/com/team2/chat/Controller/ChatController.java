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

    @MessageMapping("/votingChatIngoing/")
//    @SendTo("topic/votingChatIngoing/")
    public void votingChatIngoing(@Payload Message message) {

        System.out.println("votingChatIngoing: " + message.getMessage());

        chatService.processMessage(message);
        messagingTemplate.convertAndSend("/topic/votingChatIngoing/", message);
    }

    @MessageMapping("/votingChatIngoing/{userId}")
    public void votingChatIngoingUserId(@Payload Message message, @DestinationVariable String userId) {

        System.out.println("ingoing: " + message.getMessage());


        message.setMessage(chatService.getSomething(message.getMessage()));

        messagingTemplate.convertAndSend(String.format("/topic/votingChatIngoing/%s", userId), message);
        messagingTemplate.convertAndSend("/topic/votingChatIngoing/", message);
    }

    @MessageMapping("/chatIngoing/")
//    @SendTo("topic/ingoing/")
    public void chatIngoing(@Payload Message message) {

        System.out.println("votingChatIngoing: " + message.getMessage());

        chatService.processMessage(message);
        messagingTemplate.convertAndSend("/topic/chatIngoing/", message);
    }

    @MessageMapping("/chatIngoing/{userId}")
    public void chatIngoingUserId(@Payload Message message, @DestinationVariable String userId) {

        System.out.println("ingoing: " + message.getMessage());


        message.setMessage(chatService.getSomething(message.getMessage()));

        messagingTemplate.convertAndSend(String.format("/topic/chatIngoing/%s", userId), message);
        messagingTemplate.convertAndSend("/topic/chatIngoing/", message);
    }
}
