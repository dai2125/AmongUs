package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
@PropertySource("classpath:application.properties")
public class MovementController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MovementService movementService;

    @Autowired
    private RegisterService registerService;

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    @EventListener

    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) {
        try {
            messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.
                    disconnectUser(event.getSessionId())));
            logger.info("User disconnected: {}", event.getUser());
        } catch (JsonProcessingException e) {
            logger.error("Error processing UserDisconnect JSON: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error at UserDisconnect occurred: {}", e.getMessage());
        }
    }

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try {
            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.registerUser(user, simpMessageHeaderAccessor)));

            for(User u : registerService.userList) {
                messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));
            }

            if(registerService.startGame && !registerService.sendAlready) {
                messagingTemplate.convertAndSend("/topic/startGame/", "test");
                registerService.sendAlready = true;
            }
        } catch (JsonProcessingException e) {
            logger.error("Error processing Registration JSON: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error at Registration occurred: {}", e.getMessage());
        }
    }


    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        try{
            messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
        } catch (JsonProcessingException e) {
            logger.error("Error processing new Position JSON: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error at new Position occurred: {}", e.getMessage());
        }
    }

    @MessageMapping("/movement/CLOSED/{userId}")
    public void movementUserId(@Payload User user){
        try{
        messagingTemplate.convertAndSend("/topic/movement/{userId}", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));

        } catch (JsonProcessingException e) {
            logger.error("Error processing Movement JSON: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error at Movement occurred: {}", e.getMessage());
        }
    }
}
