import React, { useEffect, useState } from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import './main.css';
import './output.css';
import '../src/CSS/chatbox.css';

function getRandomIntInclusive(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [client, setClient] = useState(null);
    const [userId, setUserId] = useState(0);

    if(userId === 0) {
        setUserId(getRandomIntInclusive());
    }

    useEffect(() => {
        if (!userId) return;
        const socket = new SockJS("http://localhost:8081/chat");
        const stompClient = Stomp.over(socket);
        setClient(stompClient);

        stompClient.connect({}, () => {

            stompClient.subscribe('/topic/ingoing/', message => {
                const messageData = JSON.parse(message.body);
                if(messageData.userId.toString() !== userId.toString()) {
                    setMessages(prev => [...prev, {
                        userId: messageData.userId,
                        text: messageData.message,
                        isOwnMessage: false,
                        color: messageData.color
                    }]);
                }
            });

            stompClient.subscribe(`/topic/ingoing/${userId}`, message => {
                const messageData = JSON.parse(message.body);
                setMessages(prev => [...prev, {
                    userId: messageData.userId,
                    text: messageData.message,
                    isOwnMessage: true,
                    color: messageData.color
                }]);
            });
        }, error => {
            console.error('STOMP error', error);
        });

        return () => {
            stompClient.disconnect(() => {
                console.log('Disconnected');
            });
        };
    }, [userId]);

    const sendMessage = () => {
        if (inputValue.trim() !== '') {

            client.send(`/app/ingoing/${userId}`, {}, JSON.stringify({
                'userId': userId,
                'message': inputValue,
                'color': 'orange'
            }));
            setInputValue('');
        }
    };

    return (
        <div className="chatbox" >
            <div className="message-list">
                {messages.map((message, index) => (
                    message.isOwnMessage ?
                        <p style={{color: message.color}} className="message-list-my" key={index}>
                            <img src={`../src/images/Chat/chat_right_${message.color}.png`} alt="user"/>
                            {message.userId}<br/>{message.text}
                        </p> :
                        <p style={{color: message.color}} className="message-list-other" key={index}>
                            <img src={`../src/images/Chat/chat_left_${message.color}.png`} alt="user"/>
                            {message.userId}<br/>{message.text}
                        </p>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="input-field"
                />
                <button onClick={sendMessage} className="send-button"></button>
            </div>
        </div>
    );
}

export default ChatBox;