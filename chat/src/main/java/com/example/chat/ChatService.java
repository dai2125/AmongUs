package com.example.chat;

public class ChatService {

    // TODO @Autowired Service for bad language
    // eventually webservice
    // Liskov principle, Fowler

    public Message processMessage(Message message) {
        message.setMessage(ChatValidationUtil.messageFilterBadLanguage(message.getMessage()));
//        return (ChatValidationUtil.messageFilterBadLanguage(message));
        return message;
    }

    // TODO save bad language usage to database with point system
    // TODO save message to database
}
