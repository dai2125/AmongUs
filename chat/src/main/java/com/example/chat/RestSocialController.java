package com.example.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestSocialController {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    private FriendService friendService = new FriendService();

    @PostMapping("/friendsRequest/{userId}")
    public ResponseEntity<Void> sendFriendsRequest(@PathVarible("userId") String userId, @RequestBody FriendRequest friendRequest) {

        if(friendService.friendRequest(friendRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
