package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MoveController {

	@MessageMapping("/test")
	@SendTo("/topic/move")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1); // simulated delay
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + ", you will be connected to a game!");
	}

}
