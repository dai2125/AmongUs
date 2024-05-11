package com.team2.chat.Controller;

import com.team2.chat.DataModel.UserChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestSocialController {

    @Autowired
    SimpMessagingTemplate messagingTemplate;


    @PostMapping("/friendsRequest/{userId}")
    public ResponseEntity<Void> sendFriendsRequest(@PathVariable("userId") String userId, @RequestBody UserChat user) {


        return ResponseEntity.badRequest().build();
    }

}
