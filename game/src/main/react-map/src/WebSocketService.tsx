import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Player } from './Player';
import React from 'react';

let sessionId = ""

interface RegistrationData {
    action?: string | null;
    sessionId?: string;
    gameId?: string;
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
    private setTasks: React.Dispatch<React.SetStateAction<{task1: string, task2: string, task3: string}>>;
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

    constructor(playerRef: React.MutableRefObject<Player>,
                setOtherPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
                startTimer: () => void,
                setTasks: React.Dispatch<React.SetStateAction<{task1: string, task2: string, task3: string}>>,
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
                noOneGotEjected: () => void) {
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
    }


    connect() {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        this.client = Stomp.over(socket);

        const { playerRef, setOtherPlayers } = this;

        this.client.connect({}, () => {

            this.client.subscribe('/topic/register/', (message) => {
                const registrationData: RegistrationData = JSON.parse(message.body);
                sessionId = registrationData.sessionId
                if(!this.signedIn){
                    playerRef.current = new Player(
                        playerRef.current.getUserName(),
                        registrationData.action ?? '',
                        registrationData.sessionId ?? '',
                        registrationData.gameId ?? '' ,
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
                    this.sendMovement("ArrowUp");
                    this.sendMovement("ArrowDown");

                }
                const otherPlayer = new Player(
                    registrationData.userName ?? '',
                    registrationData.action ?? '',
                    registrationData.sessionId ?? '',
                    registrationData.gameId ?? '',
                    registrationData.color ?? '',
                    registrationData.x  ,
                    registrationData.y  ,
                    '',
                    '',
                    '',
                    ''
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
                    this.startTimer();
                    //this.gimmeWork();
                    //this.gimmework();
                });

                this.client.subscribe(`/topic/gimmework/${sessionId}`, (message) => {

                    const data = JSON.parse(message.body);
                    console.log('gimmeMywork: ' + data.task1 + ' ' + data.task2 + ' ' + data.task3 + ' ' + data.role);
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
                    // TODO display Screen
                    // TODO Dead Body stays on the x y coordinate
                    console.log('You are dead now');
                    playerRef.current.setMovable(false);
                    playerRef.current.setColor("dead");
                    this.dead();
                    // playerRef.current.setImage(deadPlayer.image);
                });

                this.client.subscribe(`/topic/someoneGotKilled/${playerRef.current.getGameId()}`, (message) => {

                    const deadPlayer = JSON.parse(message.body);

                    setOtherPlayers((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {
                            if (p.getSessionId() === deadPlayer) {
                                // Update existing player's positions
                                p.setColor('dead');
                            }
                            return p;
                        });
                        return updatedPlayers;
                    });
                    // playerRef.current.setImage(deadPlayer.image);
                });

                this.client.subscribe(`/topic/taskResolved/${playerRef.current.getGameId()}`, () => {
                    this.updateTasks();
                });

                this.client.subscribe(`/topic/crewmateWins/${playerRef.current.getGameId()}`, () => {
                    // TODO
                    this.crewmateWins();
                });

                this.client.subscribe(`/topic/impostorWins/${playerRef.current.getGameId()}`, () => {
                    // TODO
                    this.impostorWins();
                });
            }, 500);

            setTimeout(() => {
                this.gimmeWork();
            }, 500);


            this.client.subscribe('/topic/disconnected/', (message) => {
                const disconnectedPlayer = JSON.parse(message.body);
                console.log('Player disconnected:', disconnectedPlayer);
                const disconnectedPlayerID = disconnectedPlayer.sessionId;
                setOtherPlayers((prevOtherPlayers) => {
                    return prevOtherPlayers.filter((p) => p.getSessionId() !== disconnectedPlayerID);
                });
            })

            // this.client.subscribe(`/topic/disconnected/${playerRef.current.getUserName()}`, () => {
            //     setOtherPlayers([]);
            // });
            //
            // this.client.disconnect(() => {
            //     setOtherPlayers([]);
            // });

            this.client.subscribe(`/topic/movement/${playerRef.current.getUserName()}`, (message) => {
                const movementData = JSON.parse(message.body);

                if(movementData.sessionId === playerRef.current.getSessionId()) {
                    this.playerRef.current.setX(movementData.x);
                    this.playerRef.current.setY(movementData.y);
                }
            })
            // })

            this.client.subscribe('/topic/movement/', (message) => {
                const movementData = JSON.parse(message.body);

                if(movementData.sessionId === playerRef.current.getSessionId()) {
                    this.playerRef.current.setX(movementData.x);
                    this.playerRef.current.setY(movementData.y);
                }

                setOtherPlayers((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === movementData.sessionId) {
                            p.setX(movementData.x);
                            p.setY(movementData.y);

                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            })


            // this.client.subscribe(`/topic/someoneGotKilled/${playerRef.current.getUserName()}`, (message) => {




            this.client.subscribe(`/topic/gimmework/${playerRef.current.getUserName()}`, (message) => {

                const data = JSON.parse(message.body);
                console.log('gimmework: ' + data.task1 + ' ' + data.task2 + ' ' + data.task3 + ' ' + data.role);
                playerRef.current.setTask1(data.task1);
                playerRef.current.setTask2(data.task2);
                playerRef.current.setTask3(data.task3);
                playerRef.current.setRole(data.role);
                this.playerInstance();
            });

            // this.client.subscribe(`/topic/yourAGhostNow/${playerRef.current.getUserName()}`, (message) => {
            this.client.subscribe('/topic/yourAGhostNow/', () => {

                // TODO  dead image
                // TODO notify all other Players that you are a ghost now

                if(playerRef.current.getColor() === 'dead') {
                    console.log('Its a me! Im dead and now a ghost');
                    playerRef.current.setMovable(true);
                    playerRef.current.setColor('ghost');

                }
            });

            this.client.subscribe('/topic/votingActive/', (message) => {
                // TODO player who called the report and the dead player must be in the parameters
                const deadPlayer = JSON.parse(message.body);
                playerRef.current.setMovable(false);
                this.votingActive(deadPlayer);
                // this.reportButtonPressed = true;
            });

            this.client.subscribe('/topic/votingNotActive/', () => {
                playerRef.current.setMovable(true);
                this.votingNotActive();
                // this.reportButtonPressed = true;
            });

            this.client.subscribe(`/topic/ejected/${playerRef.current.getUserName()}`, () => {
                this.ejectMe();
                // this.client.unsubscribe('/topic/someoneGotEjected/');
            });

            this.client.subscribe('/topic/someoneGotEjected/', (message) => {
                const ejectedPlayer = JSON.parse(message.body);

                if(ejectedPlayer === playerRef.current.getUserName()) {
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


    sendMovement(key: string) {
        if(!this.playerRef.current.getMovable()) {
            return;
        }
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(key);

            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: player.getColor(),
                x: player.getX(),
                y: player.getY()
            });

            this.client.send(`/app/movement/${player.getSessionId()}`, {}, payload);
        }
    }

    gimmework() {
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
                    throw new Error('Name or Password is wrong');
                }
            })
            .then((data: TaskResponse) => {
                this.playerRef.current.setTask1(data.task1);
                this.playerRef.current.setTask2(data.task2);
                this.playerRef.current.setTask3(data.task3);
                this.playerRef.current.setRole(data.role);
                this.playerInstance();

                this.setTasks({ task1: data.task1, task2: data.task2, task3: data.task3 });
                console.log('GimmeMyWork: ' + data.task1 + ' ' + data.task2 + ' ' + data.task3 + ' ', data.role );
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    gimmeWork() {
        console.log("NNNNNNNN");
        console.log(sessionId);
        if (this.client) {
            const player = this.playerRef.current;
            this.client.send('/app/gimmework/', {}, JSON.stringify({
                'userName': this.playerRef.current.getUserName(),
                'action': player.getAction(),
                'sessionId': sessionId,
                'color': player.getColor(),
                'x': player.getX(),
                'y': player.getY()
            }));

        }
    }

    sendKill(key: string) {
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(key);

            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: player.getColor(),
                x: player.getX(),
                y: player.getY()
            });

            this.client.send(`/app/kill/${player.getUserName()}`, {}, payload);
        }
    }

    sendTaskDone(task: string, xPosTask: number, yPosTask: number) {
        if (this.client) {
            const player = this.playerRef.current;
            player.setAction(task);

            const payload = JSON.stringify({
                userName: player.getUserName(),
                action: player.getAction(),
                sessionId: player.getSessionId(),
                gameId: player.getGameId(),
                color: player.getColor(),
                x: xPosTask,
                y: yPosTask
            });

            this.client.send(`/app/task/${player.getUserName()}`, {}, payload);
        }
    }

    yourAGhostNow() {
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

            this.client.send('/app/yourAGhostNow/', {}, payload);

            // this.client.send(`/app/yourAGhostNow/${player.getUserName()}`, {}, payload);
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
                color: player.getColor(),
                x: player.getX(),
                y: player.getY(),
            });

            this.client.send(`/app/taskResolved/`, {}, payload);
            //this.client.send(`/app/movement/${player.getSessionId()}`, {}, payload);
        }
    }
}

export default WebSocketService;
