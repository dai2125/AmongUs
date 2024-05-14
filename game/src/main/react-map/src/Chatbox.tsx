import React, {useEffect, useRef, useState} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import './main.css';
import './output.css';
import '../src/CSS/chatbox.css';
import chatButton from "./images/Buttons/chat_button.png";
import chatButtonNotification from "./images/Buttons/chat_button_notification.png";

function getRandomIntInclusive(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [client, setClient] = useState(null);
    const [userId, setUserId] = useState(0);
    const messageEndRef = useRef(null);
    const [chatVisible, setChatVisible] = useState(false);
    const [chatIcon, setChatIcon] = useState(chatButton);

    if (userId === 0) {
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
                if (messageData.userId.toString() !== userId.toString()) {
                    setMessages(prev => [...prev, {
                        userId: messageData.userId,
                        text: messageData.message,
                        isOwnMessage: false,
                        color: messageData.color
                    }]);
                    if(!chatVisible) {
                        notification(false);
                    }
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

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const sendMessage = () => {
        if (inputValue.trim() !== '') {

            // client.send('/app/ingoing/', {}, JSON.stringify({
            client.send(`/app/ingoing/${userId}`, {}, JSON.stringify({
                'userId': userId,
                'message': inputValue,
                'color': 'orange'
            }));
            setInputValue('');
        }
    };

    const toggleChat = () => {
        if (!chatVisible) {
            setChatVisible(true);
            notification(true);
        } else {
            setChatVisible(false);
        }
    }

    const notification = (read: boolean) => {
        if(read) {
            setChatIcon(chatButton);
        } else if(!read) {
            setChatIcon(chatButtonNotification);
        }
    }

    return (
        <div>
            <button className="w-10 h-10" onClick={toggleChat}><img alt="chatButton"
                                                                    className="w-10 h-10 hover:bg-black"
                                                                    src={chatIcon}></img></button>
            <div className={chatVisible ? "" : "hidden"}>
                <div className="chatbox">
                    <div className="message-list">
                        {messages.map((message, index) => (
                            message.isOwnMessage ?
                                <div className="message message-list-my" key={index}>
                                    <div className="message-content-my">
                                        <div>{message.text}</div>
                                    </div>
                                    <div className="message-id-my" style={{color: message.color}}>
                                        <img src={`../src/images/Chat/chat_right_${message.color}.png`}
                                             alt="user"/><br/>
                                        {message.userId}
                                    </div>
                                </div> :
                                <div className="message message-list-other" key={index}>
                                    <div className="message-id" style={{color: message.color}}>
                                        <img src={`../src/images/Chat/chat_left_${message.color}.png`} alt="user"/><br/>
                                        {message.userId}
                                    </div>
                                    <div className="message-content-other">
                                        <div>{message.text}</div>
                                    </div>
                                    <div ref={messageEndRef}/>
                                </div>
                        ))}
                    </div>
                    <div className="character-counter">{inputValue.length}/100</div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={inputValue}
                            maxLength={100}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="input-field"
                        />
                        <button onClick={sendMessage} className="send-button"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
