import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WebSocketClient: React.FC = () => {
    const [stompClient, setStompClient] = useState<any>(null); // State to hold the stompClient

    useEffect(() => {

        if (!stompClient) {
            const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
            const client = Stomp.over(socket);
            client.connect({}, () => {
                setStompClient(client);
                console.log("WebSocket connection established");
            }, (error) => {
                console.error('Error connecting to WebSocket:', error);
            });
        }

        // Cleanup function
        return () => {
            // Disconnect only if stompClient is defined
            stompClient && stompClient.disconnect({});
        };
    }, [stompClient]); // Dependency array includes stompClient

    useEffect(() => {
        if (stompClient) {
            // Subscribe to desired destination
            const subscription = stompClient.subscribe('/topic/test/', (message) => {
                console.log('Received message:', message.body);
            });

            // Handle subscription error
            subscription && subscription.error((error) => {
                console.error('Error in subscription:', error);
            });
        }
    }, [stompClient]); // Dependency array includes stompClient

    return null; // This component doesn't render anything visible
};

export default WebSocketClient;
