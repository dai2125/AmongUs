package com.team2.chat.Service;

import com.team2.chat.DataModel.Message;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public Message processMessage(Message message) {
//        message.setMessage(ChatValidationUtil.messageFilterBadLanguage(message.getMessage()));
//        return (ChatValidationUtil.messageFilterBadLanguage(message));
        return message;
    }

}
