import React, { useEffect, useState } from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import './main.css';
import './output.css';

function getRandomIntInclusive(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function ChatBox() {
    const [myMessages, setMyMessages] = useState([]);
    const [otherMessages, setOtherMessages] = useState([]);
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
        setClient(stompClient); // Store the client in state

        stompClient.connect({}, frame => {

            stompClient.subscribe('/topic/ingoing/', message => {
                const messageData = JSON.parse(message.body);
                console.log('UseEffect(): without userId message: ', messageData.message + ' messageUserId: ' + messageData.userId + ' myUserId: ' + userId);
                if(messageData.userId.toString() !== userId.toString()) {
                    setOtherMessages(prev => [...prev, {
                        userId: messageData.userId,
                        text: messageData.message }]);
                }
            });

            stompClient.subscribe(`/topic/ingoing/${userId}`, message => {
                const messageData = JSON.parse(message.body);
                console.log('UseEffect(): with userID ', messageData.message);
                setMyMessages(prev => [...prev, {
                    userId: messageData.userId,
                    text: messageData.message }]);
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
        // if (inputValue.trim() !== '' && client) {
        console.log('userId: ', userId);
        // client.send('/app/ingoing/', {}, JSON.stringify({

        client.send(`/app/ingoing/${userId}`, {}, JSON.stringify({
            // userId: 1, // Assuming userId is 1 for example
            'userId': userId,
            'message': inputValue
        }));
        setInputValue('');
        // }
    };

    return (
        <div className="chatbox absolute top-20 left-1/4 w-1/2 h-1/3 bg-white bg-opacity-80 border rounded-lg p-4"
             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
            {/*<h2 className="font-bold text-lg">Chat</h2>*/}
            <div className="message-list">
                {myMessages.map((message, index) => (
                    <p className="message-list-my" key={index}>{message.text}</p>
                ))}
                {otherMessages.map((message, index) => (
                    <p className="message-list-other" key={index}>{message.text}</p>
                ))}
            </div>
            {/*<div className="message-list-other">*/}
            {/*    {otherMessages.map((message, index) => (*/}
            {/*        <p key={index}>{message.text}</p>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className="input-area">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="input-field"
                    // className="flex-grow m-2 p-2"
                />
                {/*<div className="chatbox-send-button">*/}
                <button onClick={sendMessage} className="m-2 w-20 h-12 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">Send</button>
                {/*<button onClick={sendMessage}>Send</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
        ;
}

export default ChatBox;