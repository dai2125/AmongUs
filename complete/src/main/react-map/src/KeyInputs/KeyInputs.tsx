import React, {createContext, useEffect, useState} from 'react';
import Stomp, {Client, client} from 'stompjs';
import SockJS from 'sockjs-client';
import {Player} from "../MapGrid/Player";
import { getAction, getColor, getUserId, getX, getY, setColor, setAction, setX, setY, setUserIdStore} from "../store";

interface WebSocketContextType {

    stompClient: Client | null;
    userId: string;

}

type props = {
    userId: string;

}

let otherPlayers: any[] = [];

const WebSocketClient: React.FC = () => {
    const [stompClient, setStompClient] = useState<any>(null); // State to hold the stompClient
    const [userId, setUserId] = useState<string>(''); // State to hold the userId
    const [gamer, setGamer] = useState<Player | null>(null);

    useEffect(() => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxIn useEffect');
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
    }, [stompClient, userId]); // Dependency array includes stompClient

    useEffect(() => {

        if (stompClient) {
            // Subscribe to desired destination
            const subscription = stompClient.subscribe('/topic/register/', (message) => {

                const response = JSON.parse(message.body);
                setUserId(response.userId);

                console.log('KeyInput.tsx UserID ', response.userId + ' X ', response.x + ' Y ', response.y + ' Color ', response.color);
                setUserIdStore(response.userId);
                setAction(response.action);
                setColor(response.color);
                setX(response.x);
                setY(response.y);
                setGamer(new Player(response.action, response.userId, response.color, response.x, response.y));
                // delay(1000);
                // setTimeout(() => {
                //     new Player(response.action, response.userId, response.color, response.x, response.y);

                console.log('KeyInput.tsx DataModel action ', response.action + ' UserID ', response.userId + ' X ', response.x + ' Y ', response.y + ' Color ', response.color);
                // new Player()
                if(!userId) {
                    setUserId(response.userId);
                    // setUserId(response.userId);
                    setAction(response.action);
                    setUserIdStore(response.userId);
                    setColor(response.color);
                    setX(response.x);
                    setY(response.y);
                    console.log('UserID ', response.userId + ' X ', response.x + ' Y ', response.y + ' Color ', response.color);
                } else if (response.userId !== userId) {
                    // TODO Reagiert nicht auf die Nachrichten
                    let newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
                    otherPlayers.push(newPlayer);

                    console.log('New Player: ', response.userId + ' X ', response.x + ' Y ', response.y + ' Color ', response.color);
                    // createNewPlayer(response.action, response.userId, response.x, response.y, response.color);
                }
            });
            const publish = stompClient.send('/app/register/', {}, JSON.stringify({ name: 'John Doe' }));
        }
    }, [stompClient, userId]); // Dependency array includes stompClient
    // return userId;
    return null; // This component doesn't render anything visible
};

const createNewPlayer = (action: string, userId: string, x: number, y: number, color: string) => {

}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default WebSocketClient;
export const gamer = new Player(getAction(), getUserId(), getColor(), getX(), getY());