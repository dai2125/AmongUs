package com.team2.game.GamingController;

import com.team2.game.DataModel.User;
//import com.example.messagingstompwebsocket.chat.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.game.WebConfiguration.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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

    // TODO sessionId only for game
    // TODO userId rename in all Files

    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MovementService movementService;

    private static final Logger logger = LoggerFactory.getLogger(MovementController.class);

    public MovementController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Autowired
    private RegisterService registerService;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @EventListener
    public void sessionConnectEvent(SessionConnectEvent event) throws InterruptedException, JsonProcessingException {
//        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
//        System.out.println("SessionConnectEvent headers.getSessiondId() : " + headers.getSessionId());
//        String sessionId = headers.getSessionId();
     }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent event) throws JsonProcessingException {

        messagingTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.disconnectUser(event.getSessionId())));
        // TODO message all Players a connection got lost
//        rabbitTemplate.convertAndSend("/topic/disconnected/", new ObjectMapper().writeValueAsString(registerService.disconnectUser(event.getSessionId())));
    }

    @MessageMapping("/register/")
    @SendTo("/topic/register/")
    public void register(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.registerUser(user, simpMessageHeaderAccessor)));
        System.out.println("register: send to service");
//        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, registerService.registerUser(user, simpMessageHeaderAccessor));

        // TODO testing before pushing
        for(User u : registerService.userList) {
            messagingTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));
//            rabbitTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(u));

        }
        if(registerService.startGame) {
            messagingTemplate.convertAndSend("/topic/startGame/", "test");
        }
//        rabbitTemplate.convertAndSend("/topic/register/", new ObjectMapper().writeValueAsString(registerService.updateAllUserWithTheNewUser()));
    }

    @MessageMapping("/movement/{userId}")
    @SendTo("/topic/movement/")
    public void processMovement(@Payload User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
//        rabbitTemplate.convertAndSend("/topic/movement/", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));

    }

    @MessageMapping("/movement/CLOSED/{userId}")
//    @SendTo("/topic/movement/{userId}")
    public void movementUserId(@Payload User user) throws JsonProcessingException {
        messagingTemplate.convertAndSend("/topic/movement/{userId}", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));
//        rabbitTemplate.convertAndSend("/topic/movement/{userId}", new ObjectMapper().writeValueAsString(movementService.wallCollision(user)));

    }

//    @MessageMapping("/ingoing/")
//    @SendTo("topic/ingoing/")
//    public void ingoing(@Payload Message message) {
////    public void ingoing(String message) {
//        messagingTemplate.convertAndSend("/topic/ingoing/", message);
//    }
//
//    @MessageMapping("/outgoing/")
//    @SendTo("topic/outgoing/")
//    public void outgoing() {
//        messagingTemplate.convertAndSend("/topic/outgoing/", "outgoing");
//    }
}
