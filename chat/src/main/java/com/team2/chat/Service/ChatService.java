package com.team2.chat.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.chat.DataModel.Message;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

@Service
public class ChatService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Message processMessage(Message message) {
        message.setMessage(ChatValidationUtil.messageFilterBadLanguage(message.getMessage()));
        return message;
    }

    public String getSomething(String message) {
        String result = restTemplate.getForObject("https://www.purgomalum.com/service/json?text={message}", String.class, message);

        ObjectMapper mapper = new ObjectMapper();
        String filteredMessage = null;
        try {
            Map<String, String> map = mapper.readValue(result, Map.class);
            filteredMessage = map.get("result");
        } catch (IOException e) {
            e.printStackTrace();
        }
        message = filteredMessage;

        System.out.println("ChatService getSomething: " + message);
        return message;
    }
}
