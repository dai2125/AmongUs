package com.example.messagingstompwebsocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;

@Controller
public class GreetingController {

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000);
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + ", you will be connected to a game!");
	}

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	ArrayList<String> test = new ArrayList<String>();

	@MessageMapping("/user/{userId}")
	@SendTo("/topic/user/{userId}")
	public void user(@DestinationVariable String userId, HelloMessage message) throws Exception {
		System.out.println("sessionID Greeting user: " + userId);
		if(!test.contains(userId)) {
			test.add(userId);
		}
		System.out.println("ArrayList: " + test);
		Greeting greeting = new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + " your sessionID is " + userId);
		messagingTemplate.convertAndSend("/topic/user/" + userId, greeting);
	}
}
