import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {Player} from './Player';
import React from 'react';

let sessionId = ""

interface RegistrationData {
    userName?: string;
    action?: string | null;
    sessionId?: string;
    gameId?: string;
    color?: string | null;
    x: number;
    y: number;
}

class WebSocketService {
    private client: Stomp.Client | null = null;
    private playerRef: React.MutableRefObject<Player>;
    private setOtherPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    private signedIn: boolean = false;
    private startTimer: () => void;
    private setTasks: React.Dispatch<React.SetStateAction<{ task1: string, task2: string, task3: string }>>;
    private setCrewmateDead: React.Dispatch<React.SetStateAction<boolean>>;
    private updateTasks: () => void;
    private dead: () => void;
    private impostorWins: () => void;
    private crewmateWins: () => void;
    private playerInstance: () => void;
    private kill: () => void;
    private votingActive: (deadPlayer) => void;
    private votingNotActive: () => void;
    private ejectMe: () => void;
    private someoneGotEjected: (ejectedPlayer) => void;
    private noOneGotEjected: () => void;
    private setCompletedTaskCount: React.Dispatch<React.SetStateAction<number>>;
    private taskProgress: React.MutableRefObject<number>;

    constructor(playerRef: React.MutableRefObject<Player>,
                setOtherPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
                startTimer: () => void,
                setTasks: React.Dispatch<React.SetStateAction<{ task1: string, task2: string, task3: string }>>,
                setCrewmateDead: React.Dispatch<React.SetStateAction<boolean>>,
                updateTasks: () => void,
                dead: () => void,
                impostorWins: () => void,
                crewmateWins: () => void,
                playerInstance: () => void,
                kill: () => void,
                votingActive: (deadPlayer) => void,
                votingNotActive: () => void,
                ejectMe: () => void,
                someoneGotEjected: (ejectedPlayer) => void,
                noOneGotEjected: () => void,
                setTaskCompletedCount: React.Dispatch<React.SetStateAction<number>>,
                taskProgress: React.MutableRefObject<number>) {
        this.playerRef = playerRef;
        this.setOtherPlayers = setOtherPlayers;
        this.startTimer = startTimer;
        this.setTasks = setTasks;
        this.setCrewmateDead = setCrewmateDead;
        this.updateTasks = updateTasks;
        this.dead = dead;
        this.impostorWins = impostorWins;
        this.crewmateWins = crewmateWins;
        this.playerInstance = playerInstance;
        this.kill = kill;
        this.votingActive = votingActive;
        this.votingNotActive = votingNotActive;
        this.ejectMe = ejectMe;
        this.someoneGotEjected = someoneGotEjected;
        this.noOneGotEjected = noOneGotEjected;
        this.setCompletedTaskCount = setTaskCompletedCount;
        this.taskProgress = taskProgress;
    }


    connect() {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        this.client = Stomp.over(socket);

        const {playerRef, setOtherPlayers} = this;

        this.client.connect({}, () => {

            this.client.subscribe('/topic/register/', (message) => {
                const registrationData: RegistrationData = JSON.parse(message.body);
                sessionId = registrationData.sessionId
                if (!this.signedIn) {
                    playerRef.current = new Player(
                        playerRef.current.getUserName(),
                        registrationData.action ?? '',
                        registrationData.sessionId ?? '',
                        registrationData.gameId ?? '',
                        registrationData.color ?? '',
                        registrationData.x,
                        registrationData.y,
                        '',
                        '',
                        '',
                        '',
                        true,
                        'south'
                    );
                    this.signedIn = true;
                    this.signedIn = true;
                }
                const otherPlayer = new Player(
                    registrationData.userName ?? '',
                    registrationData.action ?? '',
                    registrationData.sessionId ?? '',
                    registrationData.gameId ?? '',
                    registrationData.color ?? '',
                    registrationData.x,
                    registrationData.y,
                    '',
                    '',
                    '',
                    '',
                    true,
                    'south'
                )

                if ((registrationData.sessionId !== playerRef.current.getSessionId()) && (registrationData.gameId === playerRef.current.getGameId())) {
                    setOtherPlayers((prevOtherPlayers) => {
                        const existingPlayer = prevOtherPlayers.find((p) => p.getSessionId() === registrationData.sessionId);
                        if (!existingPlayer) {
                            return [...prevOtherPlayers, otherPlayer];
                        }
                        return prevOtherPlayers;
                    });
                }
            });

            this.sendRegistrationData();

            setTimeout(() => {

                this.client.subscribe(`/topic/startGame/${playerRef.current.getGameId()}`, () => {
                    setTimeout(() => {
                        this.gimmeWork();
                    }, 100);
                    this.startTimer();
                });

                this.client.subscribe(`/topic/gimmework/${playerRef.current.getUserName()}`, (message) => {
                    const data = JSON.parse(message.body);
                    this.playerRef.current.setTask1(data.task1);
                    this.playerRef.current.setTask2(data.task2);
                    this.playerRef.current.setTask3(data.task3);
                    this.playerRef.current.setRole(data.role);
                    this.playerInstance();
                });

                this.client.subscribe(`/topic/kill/${playerRef.current.getUserName()}`, () => {
                    this.kill();
                });

                this.client.subscribe(`/topic/dead/${playerRef.current.getUserName()}`, () => {
                    playerRef.current.setMovable(false);
                    playerRef.current.setColor('dead');
                    this.dead();
                });

                this.client.subscribe(`/topic/someoneGotKilled/${playerRef.current.getGameId()}`, (message) => {
                    const deadPlayer = JSON.parse(message.body);

                    setOtherPlayers((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {
                            if (p.getSessionId() === deadPlayer) {
                                p.setColor('dead');
                            }
                            return p;
                        });
                        return updatedPlayers;
                    });
                });

                this.client.subscribe(`/topic/taskResolved/${playerRef.current.getGameId()}`, (message) => {
                    const percentage = JSON.parse(message.body);
                    this.taskProgress.current = percentage;
                    this.updateTasks();
                });

                this.client.subscribe('/topic/crewmateWins/', () => {
                    this.crewmateWins();
                });

                this.client.subscribe(`/topic/impostorWins/${playerRef.current.getGameId()}`, () => {
                    this.impostorWins();
                });
            }, 500);


            this.client.subscribe('/topic/disconnected/', (message) => {
                const disconnectedPlayer = JSON.parse(message.body);
                const disconnectedPlayerID = disconnectedPlayer.sessionId;
                setOtherPlayers((prevOtherPlayers) => {
                    return prevOtherPlayers.filter((p) => p.getSessionId() !== disconnectedPlayerID);
                });
            })

            this.client.subscribe(`/topic/gimmework/${playerRef.current.getUserName()}`, (message) => {
                const data = JSON.parse(message.body);
                playerRef.current.setTask1(data.task1);
                playerRef.current.setTask2(data.task2);
                playerRef.current.setTask3(data.task3);
                playerRef.current.setRole(data.role);
                this.playerInstance();
            });

            this.client.subscribe(`/topic/yourAGhostNow/${playerRef.current.getUserName()}`, (message) => {
                if (playerRef.current.getColor() === 'dead') {
                    playerRef.current.setMovable(true);
                    playerRef.current.setColor('ghost');
                }
            });

            this.client.subscribe('/topic/votingActive/', (message) => {
                const deadPlayer = JSON.parse(message.body);
                playerRef.current.setMovable(false);
                this.votingActive(deadPlayer);
            });

            this.client.subscribe('/topic/votingNotActive/', () => {
                playerRef.current.setMovable(true);
                this.votingNotActive();
                if (playerRef.current.getColor() === 'dead') {
                    playerRef.current.setColor('ghost');
                }
            });

            this.client.subscribe(`/topic/ejected/${playerRef.current.getUserName()}`, () => {
                this.ejectMe();
            });

            this.client.subscribe('/topic/someoneGotEjected/', (message) => {
                const ejectedPlayer = JSON.parse(message.body);

                if (ejectedPlayer === playerRef.current.getUserName()) {
                    setOtherPlayers([]);
                    this.ejectMe();
                } else {
                    this.someoneGotEjected(ejectedPlayer);
                    setOtherPlayers((prevOtherPlayers) => {
                        return prevOtherPlayers.filter((p) => p.getUserName() !== ejectedPlayer);
                    });
                }
            });

            this.client.subscribe('/topic/noOneGotEjected/', () => {
                this.noOneGotEjected();
            });
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });
    }

    sendRegistrationData() {
        if (this.client) {
            const player = this.playerRef.current;
            this.client.send('/app/register/', {}, JSON.stringify({
                'userName': player.getUserName(),
                'action': player.getAction(),
                'sessionId': player.getSessionId(),
                'gameId': player.getGameId(),
                'color': player.getColor(),
                'x': player.getX(),
                'y': player.getY()
            }));
        }
    }

    gimmeWork() {
        if (this.client) {
            const player = this.playerRef.current;
            this.client.send(`/app/gimmework/${player.getUserName()}`, {}, JSON.stringify({
                'userName': this.playerRef.current.getUserName(),
                'action': player.getAction(),
                'sessionId': sessionId,
                'gameId': player.getGameId(),
                'color': player.getColor(),
                'x': player.getX(),
                'y': player.getY()
            }));
        }
    }

    sendReportButtonPressed() {
        if (this.client) {
            const player = this.playerRef.current;
            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: player.getColor(),
                x: player.getX(),
                y: player.getY()
            });
            this.client.send(`/app/reportButtonPressed/${player.getUserName()}`, {}, payload);
        }
    }

    sendVotingButtonPressed(votedFor: string) {
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(votedFor);
            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: player.getColor(),
                x: player.getX(),
                y: player.getY(),
            });
            this.client.send(`/app/votingButtonPressed/${player.getUserName()}`, {}, payload);
        }
    }

    sendTaskResolved(task: string, xPosTask: number, yPosTask: number) {
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(task);
            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: task,
                x: player.getX(),
                y: player.getY(),
            });

            this.client.send(`/app/taskResolved/`, {}, payload);
        }
    }

}

export default WebSocketService;
