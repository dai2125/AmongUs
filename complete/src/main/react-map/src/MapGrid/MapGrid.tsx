import { Player } from "./Player";
import {useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let otherPlayers: Player[] = [];

const GameComponent = () => {

    const canvasRef = useRef(null);

    const player = useRef(new Player("", "11",'', 0, 0));
    const [playerOne, setPlayerOne] = useState(false);

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    useEffect(() => {

        // let id = getUserId();
        let id = player.current.getUserId();

        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/register/', (message) => {
                const response = JSON.parse(message.body);

                if(player.current.getUserId() === '11') {
                    player.current = null;
                    player.current = new Player(response.action, response.userId, response.color, response.x, response.y);
                    player.current.setAction(response.action);
                    player.current.setUserId(response.userId);
                    player.current.setColor(response.color);
                    player.current.setX(response.x);
                    player.current.setY(response.y);
                    // setPlayerOne(true);
                    gameLoop();
                } else if(player.current.getUserId() !== response.userId) {
                    const newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
                    otherPlayers.push(newPlayer);
                    gameLoop();
                }
            });

            client.send(`/app/register/${player.current.getUserId()}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
            client.subscribe(`/topic/movement/`, (message) => {
                const response = JSON.parse(message.body);
                const id = response.userId;
                const color = response.color;
                const x = response.x;
                const y = response.y;
                const action = response.action;
                callback(action, id, color, x, y);
            });
        });


        const handleMove = (event: string) => {
            switch (event) {
                case 'ArrowUp':
                    console.log('ArrowUp');
                    sendMovementUp('ArrowUp');
                    // sendMovement(x , y);
                    break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                    sendMovementDown('ArrowDown');
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft');
                    sendMovementLeft('ArrowLeft');
                    break;
                case 'ArrowRight':
                    console.log('ArrowRight');
                    sendMovementRight('ArrowRight');
                    break;
                default:
                    break;
            }
        };

        function sendMovementUp(action: string) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowUp');

            client.send(`/app/movement/${player.current.getUserId()}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
        }

        function sendMovementDown(action: string) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowDown');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
        }

        function sendMovementLeft(action: string) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowLeft');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
        }

        function sendMovementRight(action: string) {
            let id = player.current.getUserId();
            player.current.setAction('ArrowRight');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
        }

        function callback(action: string, id: string, color: string, x: number, y: number) {
            let existingPlayer = otherPlayers.find((player) => player.getUserId() === id);

            if (id === player.current.getUserId()) {
                if (action === 'ArrowUp') {
                    player.current.setY(y);
                    // player.current.setX(x - 1);
                    // player.current.setY(y - 1);
                    // player.current.draw(context);
                    // xPos = xPos - 1;
                } else if (action === 'ArrowDown') {
                    player.current.setY(y);
                    // player.current.setX(x + 1);
                    // player.current.setY(y + 1);
                    // player.current.draw(context);

                    // xPos = xPos + 1;
                } else if (action === 'ArrowLeft') {
                    player.current.setX(x);
                    // player.current.setY(y - 1);
                    // player.current.setX(x - 1);
                    // player.current.draw(context);

                    // yPos = yPos - 1;
                } else if (action === 'ArrowRight') {
                    player.current.setX(x);
                    // player.current.setY(y + 1);
                    // player.current.setX(x + 1);
                    // player.current.draw(context);

                    // yPos = yPos + 1;
                }
                // gameLoop();
            } else if(existingPlayer) {
                if (action === 'ArrowUp') {
                    existingPlayer.setX(x);
                    existingPlayer.setY(y);
                    existingPlayer.setAction(action);
                    existingPlayer.draw(context);
                    // TODO return einfügen
                } else if (action === 'ArrowDown') {
                    existingPlayer.setX(x);
                    existingPlayer.setY(y);
                    existingPlayer.setAction(action);
                    existingPlayer.draw(context);
                } else if (action === 'ArrowLeft') {
                    existingPlayer.setY(y);
                    existingPlayer.setX(x);
                    existingPlayer.setAction(action);
                    existingPlayer.draw(context);
                } else if (action === 'ArrowRight') {
                    existingPlayer.setY(y);
                    existingPlayer.setX(x);
                    existingPlayer.setAction(action);
                    existingPlayer.draw(context);
                }
            } else {
                const newPlayer = new Player(action, id, color, x, y);
                otherPlayers.pop();
                otherPlayers.push(newPlayer);
                // newPlayer.draw(context);
                // drawGrid(map);
                // otherPlayers.forEach((newPlayer) => {
                //     if (newPlayer.getUserId() === id) {
                //         if (action === 'ArrowUp') {
                //             newPlayer.setX(x - 1);
                //             newPlayer.draw(context);
                //             newPlayer.setY(y);
                //             newPlayer.draw(context);
                //             newPlayer.setAction(action);
                //             return;
                //             // TODO return einfügen
                //         } else if (action === 'ArrowDown') {
                //             newPlayer.setX(x + 1);
                //             newPlayer.draw(context);
                //             newPlayer.setY(y);
                //             newPlayer.draw(context);
                //             newPlayer.setAction(action);
                //             newPlayer.draw(context);
                //             return;
                //
                //         } else if (action === 'ArrowLeft') {
                //             newPlayer.setY(y - 1);
                //             newPlayer.draw(context);
                //             newPlayer.setX(x);
                //             newPlayer.draw(context);
                //             newPlayer.setAction(action);
                //             newPlayer.draw(context);
                //             return;
                //
                //         } else if (action === 'ArrowRight') {
                //             newPlayer.setY(y + 1);
                //             newPlayer.draw(context);
                //             newPlayer.setX(x);
                //             newPlayer.draw(context);
                //             newPlayer.setAction(action);
                //             newPlayer.draw(context);
                //             return;
                //
                //         }
                //         // gameLoop();
                //
                //     }
                // });
            }
        }

        const startGameLoop = () => {
            requestAnimationFrame(() => gameLoop());
        }

        const gameLoop = () => {
            clearScreen();
            drawGrid(map);
            player.current.draw(context);
            // if(otherPlayers.length > 0) {
            //     otherPlayers.forEach((newPlayer) => {
            //         newPlayer.draw(context);
            //     });
            // }
            requestAnimationFrame(() => gameLoop());
        }

        const clearScreen = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            console.error("Could not get canvas context");
            return;

        } else {
            drawGrid(map);
        }
        startGameLoop();

        // TODO Logik Fehler bei der Bewegung der anderen Spieler
        // TODO X und Y Parameter sind um 1 verschoben
        function drawGrid(grid: number[][]) {
            let cellSize = 25;
            const context = canvasRef.current.getContext('2d');
            if (!context) {
                console.error("Could not get canvas context");
                return;
            }

            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    const value = grid[row][col];
                    if (value === 1) {
                        context.fillStyle = 'black';
                    } else if (value === 0) {
                        context.fillStyle = 'white';
                    } else if (value === 2) {
                        context.fillStyle = 'purple';
                    }
                    context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    context.strokeStyle = 'grey';
                    context.lineWidth = 1;
                    context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }

            let x = player.current.getX();
            let y = player.current.getY();
            context.fillStyle = player.current.getColor();
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

            for (let i = 0; i < otherPlayers.length; i++) {
                let playerX = otherPlayers[i].getX();
                let playerY = otherPlayers[i].getY();
                context.fillStyle = otherPlayers[i].getColor();
                context.fillRect(playerX * cellSize, playerY * cellSize, cellSize, cellSize);
            }
        }

        window.addEventListener('keydown', (event) => {
            handleMove(event.key);
        });
        }, []);

    return (
        <div>
            <canvas ref={canvasRef} width="775" height="600" style={{ backgroundColor: 'white' }}/>
        </div>
    );
};

export default GameComponent;
