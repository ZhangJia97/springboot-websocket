package xyz.suiwo.websocketdemo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import xyz.suiwo.websocketdemo.Service.WebSocketService;
import xyz.suiwo.websocketdemo.model.Message;

@Controller
public class WebSocketController {

    private WebSocketService webSocketService;

    public WebSocketController(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    @MessageMapping(value = "/single/chat")
    public void sendMessage(Message message){
        webSocketService.sendMessageTo(message.getFromUser(), message.getToUser(), message.getMessage());
    }
}