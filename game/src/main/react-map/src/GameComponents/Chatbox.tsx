import React, {useEffect, useRef, useState} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import '../CSS/main.css';
import '../CSS/output.css';
import '../CSS/chatbox.css';
import chatButton from "../Images/Buttons/chat_button.png";
import chatButtonNotification from "../Images/Buttons/chat_button_notification.png";

function getRandomIntInclusive(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function ChatBox({ playerColor, playerName }) {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [client, setClient] = useState(null);
    const [userId, setUserId] = useState(playerName);
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

            stompClient.subscribe('/topic/chatIngoing/', message => {
                const messageData = JSON.parse(message.body);
                if (messageData.userName !== userId) {
                    console.log('RECEIVED MESSAGE messageData.userName: ', messageData.userName + ' userId: ', userId);
                    setMessages(prev => [...prev, {
                        userId: messageData.userName,
                        text: messageData.message,
                        isOwnMessage: false,
                        color: messageData.color
                    }]);
                    if(!chatVisible) {
                        notification(false);
                    }
                }
            });

            stompClient.subscribe(`/topic/chatIngoing/${ playerName }`, message => {
                const messageData = JSON.parse(message.body);
                console.log('RECEIVED MESSAGE2 messageData.userName: ', messageData.userName + ' userId: ', userId);

                setMessages(prev => [...prev, {
                    userId: messageData.userName,
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

    // useEffect(() => {
    //     if (messageEndRef.current) {
    //         messageEndRef.current.scrollIntoView({behavior: 'smooth'});
    //     }
    // }, [messages]);

    useEffect(() => {
        const scrollToEnd = () => {
            const messageList = messageEndRef.current?.parentNode;
            if (messageList) {
                messageList.scrollTop = messageList.scrollHeight;
            }
        };

        scrollToEnd();
    }, [messages]);


    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            console.log('SENDING MESSAGE: ' + playerName);
            // client.send('/app/ingoing/', {}, JSON.stringify({
            client.send(`/app/chatIngoing/${userId}`, {}, JSON.stringify({
                'userName': playerName,
                'message': inputValue,
                'color': playerColor
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
                <div className="chatbox-chatbox">
                    <div className="message-list">
                        {messages.map((message, index) => (
                            message.isOwnMessage ?
                                <div className="message message-list-my" key={index}>
                                    <div className="chat-message-content-my">
                                        <div>{message.text}</div>
                                    </div>
                                    <div className="message-id-my" style={{color: 'black'}}>
                                        <img src={`../src/images/Chat/chat_right_${message.color}.png`}
                                             alt="user"/><br/>
                                        {message.userId}
                                    </div>
                                </div> :
                                <div className="message message-list-other" key={index}>
                                    <div className="message-id" style={{color: 'black'}}>
                                        <img src={`../src/images/Chat/chat_left_${message.color}.png`} alt="user"/><br/>
                                        {message.userId}
                                    </div>
                                    <div className="chat-message-content-other">
                                        <div>{message.text}</div>
                                    </div>
                                    <div ref={messageEndRef}/>
                                </div>
                        ))}
                    </div>
                    <div className="chatbox-character-counter">{inputValue.length}/100</div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={inputValue}
                            maxLength={100}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-box-input-field"
                        />
                        <button onClick={sendMessage} className="send-button"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
