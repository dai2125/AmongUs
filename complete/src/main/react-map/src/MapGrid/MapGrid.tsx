import { Player } from "./Player";
import {useEffect, useRef, useState} from "react";
import {getAction, getColor, getUserId, getX, getY} from "../store";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import '../main.css';
import '../output.css';

let otherPlayers: Player[] = [];

type Props ={
    onQuit(): void;
}

const GameComponent = ({xPos, yPos, onMove, onQuit}) => {

    const canvasRef = useRef(null);

    const player = useRef(new Player('null', 'test', 'blue', 7, 7));
    const [playerOne, setPlayerOne] = useState(false);

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
        console.log ('IDDDDDDDDDD    ', id);

        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe(`/topic/register/${id}`, (message) => {
                const response = JSON.parse(message.body);
                console.log('Subscribe UserID ', response.userId + ' action ', response.action + ' X ', response.x + ' Y ', response.y + ' Color ', response.color);
                // player.setUserId(response.userId);
                // player.
                // if(playerOne === false) {
                    player.current.setAction(response.action);
                    player.current.setUserId(response.userId);
                    player.current.setColor(response.color);
                    player.current.setX(response.x);
                    player.current.setY(response.y);
                    setPlayerOne(true);
                    // gameLoop();
                // } else /*if(player.current.getUserId() !== response.userId)*/ {
                //     const newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
                //     otherPlayers.push(newPlayer);
                //     console.log('OOOOOOOther Players instanziert', otherPlayers.length);
                //     // gameLoop();
                // }

                // new Player(response.action, response.userId, 'yellow', response.x, response.y);

            });
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
            let x = player.current.getX();
            let y = player.current.getY();

            switch (event) {
                case 'ArrowUp':
                    console.log('ArrowUp');
                    sendMovementUp(player.current.getY());
                    // sendMovement(x , y);
                    break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                    sendMovementDown(player.current.getY());
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft');
                    sendMovementLeft(player.current.getX());
                    break;
                case 'ArrowRight':
                    console.log('ArrowRight');
                    sendMovementRight(player.current.getX());
                    break;
                default:
                    break;
            }
        };

        function sendMovementUp(y: number) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowUp');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY() + 1
            }));
        }

        function sendMovementDown(y: number) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowDown');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY() - 1
            }));
        }

        function sendMovementLeft(x: number) {
            // let id = getUserId();
            let id = player.current.getUserId();
            player.current.setAction('ArrowLeft');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX() - 1,
                'y': player.current.getY()
            }));
        }

        function sendMovementRight(x: number) {
            // let id = getUserId();
            let id = player.current.getUserId();

            player.current.setAction('ArrowRight');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX() + 1,
                'y': player.current.getY()
            }));
        }

        function sendMovement(move: string) {
            // let id = getUserId();
            let id = player.current.getUserId();
            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': move,
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY()
            }));
        }

        function callback(action: string, id: string, color: string, x: number, y: number) {
            console.log('XXXXX id ', id);
            console.log('XXXXX pcid ', player.current.getUserId());

            if (id === player.current.getUserId()) {
            console.log('Callback Function ' + id + ' X ', x + ' Y ', y + ' Color ', color + ' Action ', action);
                if (action === 'ArrowUp') {
                    player.current.setX(x - 1);
                    player.current.draw(context);
                    // xPos = xPos - 1;
                } else if (action === 'ArrowDown') {
                    player.current.setX(x + 1);
                    player.current.draw(context);

                    // xPos = xPos + 1;
                } else if (action === 'ArrowLeft') {
                    player.current.setY(y - 1);
                    player.current.draw(context);

                    // yPos = yPos - 1;
                } else if (action === 'ArrowRight') {
                    player.current.setY(y + 1);
                    player.current.draw(context);

                    // yPos = yPos + 1;
                }
                // gameLoop();
            } else {
                otherPlayers.forEach((newPlayer) => {
                    if (newPlayer.getUserId() === id) {
                        if (action === 'ArrowUp') {
                            newPlayer.setX(x - 1);
                            newPlayer.draw(context);
                            newPlayer.setY(y);
                            newPlayer.draw(context);
                            newPlayer.setAction(action);
                        } else if (action === 'ArrowDown') {
                            newPlayer.setX(x + 1);
                            newPlayer.draw(context);
                            newPlayer.setY(y);
                            newPlayer.draw(context);
                            newPlayer.setAction(action);
                            newPlayer.draw(context);
                        } else if (action === 'ArrowLeft') {
                            newPlayer.setY(y - 1);
                            newPlayer.draw(context);
                            newPlayer.setX(x);
                            newPlayer.draw(context);
                            newPlayer.setAction(action);
                            newPlayer.draw(context);
                        } else if (action === 'ArrowRight') {
                            newPlayer.setY(y + 1);
                            newPlayer.draw(context);
                            newPlayer.setX(x);
                            newPlayer.draw(context);
                            newPlayer.setAction(action);
                            newPlayer.draw(context);
                        }
                        // gameLoop();

                    }
                });
            }
        }

        const startGameLoop = () => {
            requestAnimationFrame(() => gameLoop());
        }

        const gameLoop = () => {
            clearScreen();
            drawGrid(map);
            player.current.draw(context);
            // player.draw(context);
            // console.log('ZZZZZZZZZZZZZZZZZZZZZZZ');
            if(otherPlayers.length > 0) {
                otherPlayers.forEach((newPlayer) => {
                    // console.log('GGGGGGGGAME LOOP Other Players ', newPlayer.getUserId() + ' X ', newPlayer.getX() + ' Y ', newPlayer.getY() + ' Color ', newPlayer.getColor());
                    newPlayer.draw(context);
                });
            }
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

        // initializeWebSocket();
        startGameLoop();

        function initializeWebSocket() {
            const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
            const client = Stomp.over(socket);
            let id = getUserId();
            client.connect({}, () => {
                // client.subscribe(`/topic/movement/${id}` , (message) => {
                client.subscribe('/topic/movement/', (message) => {

                    const response = JSON.parse(message.body);
                    // callback(response);
                });
            });
        };

        function drawGrid(grid: number[][]) {
            let cellSize = 25;
            const context = canvasRef.current.getContext('2d');

            let x = player.current.getX();
            let y = player.current.getY();

            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    const value = grid[row][col];

                    for(let i = 0; i < otherPlayers.length; i++) {
                        if (row === otherPlayers[i].getX() && col === otherPlayers[i].getY()) {
                            context.fillStyle = otherPlayers[i].getColor();
                        }
                    }

                    if (row === x && col === y) {
                        context.fillStyle = player.current.getColor();
                    } else if (grid[row][col] === 1) {
                        context.fillStyle = 'black';
                    } else if (grid[row][col] === 0) {
                        context.fillStyle = 'white';
                    } else if (grid[row][col] === 2) {
                        context.fillStyle = 'red';
                    }

                    // for(let i = 0; i < otherPlayers.length; i++) {
                    //     if (row === otherPlayers[i].getX() && col === otherPlayers[i].getY()) {
                    //         context.fillStyle = otherPlayers[i].getColor();
                    //     }
                    // }

                    context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    context.strokeStyle = 'grey';
                    context.lineWidth = 1;
                    context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
            // window.addEventListener('keydown', (event) => {
            //     handleMove(event.key);
            // });
            return () => {
                // Bereinige hier, z.B. trenne die WebSocket-Verbindung
                // window.removeEventListener('keydown', (event) => {
                //     handleMove(event.key);
                // });
            };
        }
        window.addEventListener('keydown', (event) => {
            handleMove(event.key);
        });
        }, []);

    return (
        <div className="background">

            <div className="grid grid-rows-10 h-screen w-screen  ">
                <div className="row-span-1 ">

                    <p className="text-center text-white text-5xl mt-3">Game</p>
                </div>
                <div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">

                    <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-end">
                        <p className="font-bold m-10 underline-offset-1">Completed Tasks</p>
                    </div>
                    <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                        <canvas ref={canvasRef} width="775" height="600" style={{ backgroundColor: 'blue' }}/>
                    </div>
                    <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">
                        <button
                            className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings
                        </button>
                        <button
                            className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Map
                        </button>
                        <button
                           onClick={onQuit} className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Quit
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default GameComponent;
