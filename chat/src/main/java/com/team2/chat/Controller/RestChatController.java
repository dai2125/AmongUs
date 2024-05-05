package com.team2.chat.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class RestChatController {

    @GetMapping("https://www.purgomalum.com/service/json?text={message}")
    public String sendToWebService(@PathVariable String message) {
        return message;
    }
}
