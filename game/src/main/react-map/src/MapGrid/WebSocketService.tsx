import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Player } from './Player';
import React from 'react';

interface RegistrationData {
    action?: string | null;
    sessionId?: string;
    color?: string | null;
    x: number;
    y: number;
}

interface TaskResponse {
    task1: string;
    task2: string;
    task3: string;
    role: string;
}

class WebSocketService {
    private client: Stomp.Client | null = null;
    private playerRef: React.MutableRefObject<Player>;
    private setOtherPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    private signedIn: boolean = false;
    private startTimer: () => void;

    constructor(playerRef: React.MutableRefObject<Player>, setOtherPlayers: React.Dispatch<React.SetStateAction<Player[]>>, startTimer: () => void) {
        this.playerRef = playerRef;
        this.setOtherPlayers = setOtherPlayers;
        this.startTimer = startTimer;
    }

    connect() {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        this.client = Stomp.over(socket);

        const { playerRef, setOtherPlayers } = this;

        this.client.connect({}, () => {

            this.client.subscribe('/topic/register/', (message) => {
                const registrationData: RegistrationData = JSON.parse(message.body);
                console.log('Received registration data:', registrationData);

                if(!this.signedIn){
                    playerRef.current = new Player(
                        registrationData.action ?? '',
                        registrationData.sessionId ?? '',
                        registrationData.color ?? '',
                        registrationData.x ?? 2,
                        registrationData.y ?? 2,
                        '',
                        '',
                        '',
                        ''
                    );
                    this.signedIn = true;
                    this.signedIn = true;
                    console.log('Updated playerRef:', playerRef.current);
                    this.sendMovement("ArrowUp");
                    this.sendMovement("ArrowDown");

                }
                const otherPlayer = new Player(
                    registrationData.action ?? '',
                    registrationData.sessionId ?? '',
                    registrationData.color ?? '',
                    registrationData.x ?? 2,
                    registrationData.y ?? 2,
                    '',
                    '',
                    '',
                    ''
                )

                if (registrationData.sessionId !== playerRef.current.getSessionId()) {
                    setOtherPlayers((prevOtherPlayers) => {
                        const existingPlayer = prevOtherPlayers.find((p) => p.getSessionId() === registrationData.sessionId);
                        if (!existingPlayer) {
                            console.log('New player joined:', otherPlayer);
                            return [...prevOtherPlayers, otherPlayer];
                        }
                        return prevOtherPlayers;
                    });
                }
            });
            this.sendRegistrationData();

            this.client.subscribe('/topic/disconnected/', (message) => {
                const disconnectedPlayer: Player = JSON.parse(message.body);
                console.log('Player disconnected:', disconnectedPlayer);
                setOtherPlayers((prevOtherPlayers) => {
                    return prevOtherPlayers.filter((p) => p.getSessionId() !== disconnectedPlayer.getSessionId());
                });
            })

            this.client.subscribe('/topic/movement/', (message) => {
                const movementData = JSON.parse(message.body);

                if(movementData.sessionId === playerRef.current.getSessionId()) {
                    this.playerRef.current.setX(movementData.x);
                    this.playerRef.current.setY(movementData.y);
                    console.log('Move Player to:', movementData);
                }
                setOtherPlayers((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === movementData.sessionId) {
                            // Update existing player's positions
                            p.setX(movementData.x);
                            p.setY(movementData.y);
                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            })

            this.client.subscribe('/topic/startGame/', () => {
                this.startTimer();
                this.gimmeWork();
            });

        }, (error) => {
            console.error('WebSocket connection error:', error);
        });
    }

    sendRegistrationData() {
        if (this.client) {
            const player = this.playerRef.current;
            this.client.send('/app/register/', {}, JSON.stringify({
                'action': player.getAction(),
                'sessionId': player.getSessionId(),
                'color': player.getColor(),
                'x': player.getX(),
                'y': player.getY()
            }));
        }
    }


    sendMovement(key: string) {
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(key);

            const payload = JSON.stringify({
                action: player.getAction(),
                sessionId: player.getSessionId(),
                color: player.getColor(),
                x: player.getX(),
                y: player.getY()
            });

            this.client.send(`/app/movement/${player.getSessionId()}`, {}, payload);
        }
    }

    gimmeWork() {
        const user = {
            sessionId: this.playerRef.current.getSessionId(),
        };

        fetch(`http://localhost:8080/task/${this.playerRef.current.getSessionId()}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if(response.status === 200){
                    return response.json(); // JSON-Daten aus der Antwort extrahieren
                } else {
                    console.log(response.status);
                    throw new Error('Name or Password is wrong');
                }
            })
            .then((data: TaskResponse) => {
                this.playerRef.current.setTask1(data.task1);
                this.playerRef.current.setTask2(data.task2);
                this.playerRef.current.setTask3(data.task3);
                this.playerRef.current.setRole(data.role);

                console.log(data.task1 + ' ' + data.task2 + ' ' + data.task3 + ' ' + data.role);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

export default WebSocketService;
