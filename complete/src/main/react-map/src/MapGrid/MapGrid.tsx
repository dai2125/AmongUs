// import { Player } from "./Player";
// import {useEffect, useRef, useState} from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
//
// import '../main.css';
// import '../output.css';
//
// let userId = "";
// let clients = [];
// let gameObjects = [];
//
// let player: Player;
//
// let otherPlayers: Player[] = [];
//
// let client = undefined;
//
// type Props ={
//     onQuit(): void;
// }
//
// const GameComponent = ({xPos, yPos, onMove, onQuit}) => {
//
//     const canvasRef = useRef(null);
//
//     // const player = useRef(new Player("", "11",'yellow', 2, 2));
//     const [playerOne, setPlayerOne] = useState(false);
//
//     const map = [
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
//         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ];
//
//     useEffect(() => {
//
//         // let id = getUserId();
//         // let id = player.current.getUserId();
//
//         const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
//         const stompClientGlobal = Stomp.over(socket);
//         client = stompClientGlobal;
//         client.connect({}, (frame) => {
//             userId = frame.headers['userid'];
//
//             player = new Player(frame.headers['color'], userId, frame.headers['yellow'], frame.headers['x'], frame.headers['y']);
//             gameObjects.push(player);
//
//             client.subscribe(`/topic/register/${userId}`, (message) => {
//                 console.log('message ' + message);
//                 console.log('Player went online:', userId);
//             });
//
//             client.subscribe(`/topic/movement/`, (message) => {
//                // call function for other players movement
//                 console.log('subscribe movement' + message);
//             });
//
//             client.subscribe(`/topic/movement/${userId}`, (message) => {
//                 // update my positon
//                 console.log(`subscribe movement/${userId}` + message);
//
//             });
//
//             client.subscribe(`/topic/disconnected/`, (message) => {
//                 // remove player from gameObjects
//                 console.log('subscribe disconnected ' + message);
//
//             });
//
//             // client.subscribe('/topic/register/', (message) => {
//             //     const response = JSON.parse(message.body);
//
//                 // console.log('Player went online:', response.sessionId + ' ' + response.userId + ' ' + response.color + ' ' + response.x + ' ' + response.y);
//
//                 // if(response.action === 'offline') {
//                 //     const index = otherPlayers.findIndex((player) => player.getUserId() === response.userId);
//                 //     if (index !== -1) {
//                 //         otherPlayers.splice(index, 1);
//                 //         console.log('Player went offline:', otherPlayers);
//                 //     }
//                 // } else if(player.current.getUserId() === '11' && player.current.getColor() === 'yellow') {
//                 //     player.current = null;
//                 //     player.current = new Player(response.action, response.userId, response.color, response.x, response.y);
//                 //     player.current.setAction(response.action);
//                 //     player.current.setUserId(response.userId);
//                 //     player.current.setColor(response.color);
//                 //     player.current.setX(response.x);
//                 //     player.current.setY(response.y);
//
//                     // setPlayerOne(true);
//                     // gameLoop();
//                 // } else if(player.current.getUserId() !== response.userId) {
//                 //     const newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
//                 //     otherPlayers.push(newPlayer);
//                 //     console.log('other player moved ' + otherPlayers);
//                 //     gameLoop();
//                 // }
//             // });
//
//             // client.send(`/app/register/${player.current.getUserId()}`, {}, JSON.stringify({
//             //     'action': player.current.getAction(),
//             //     'userId': player.current.getUserId(),
//             //     'color': player.current.getColor(),
//             //     'x': player.current.getX(),
//             //     'y': player.current.getY()
//             // }));
//             // client.subscribe(`/topic/movement/`, (message) => {
//             //     const response = JSON.parse(message.body);
//             //     const id = response.userId;
//             //     const color = response.color;
//             //     const x = response.x;
//             //     const y = response.y;
//             //     const action = response.action;
//             //     callback(action, id, color, x, y);
//             });
//         });
//
//
//         const handleMove = (event: string) => {
//             switch (event) {
//                 case 'ArrowUp':
//                     console.log('ArrowUp');
//                     sendMovementUp('ArrowUp');
//                     // sendMovement(x , y);
//                     break;
//                 case 'ArrowDown':
//                     console.log('ArrowDown');
//                     sendMovementDown('ArrowDown');
//                     break;
//                 case 'ArrowLeft':
//                     console.log('ArrowLeft');
//                     sendMovementLeft('ArrowLeft');
//                     break;
//                 case 'ArrowRight':
//                     console.log('ArrowRight');
//                     sendMovementRight('ArrowRight');
//                     break;
//                 default:
//                     break;
//             }
//         };
//
//         function sendMovementUp(action: string) {
//             // let id = getUserId();
//             let id = player.getUserId();
//             player.setAction('ArrowUp');
//
//             client.send(`/app/movement/${player.getUserId()}`, {}, JSON.stringify({
//                 'action': player.getAction(),
//                 'userId': player.getUserId(),
//                 'color': player.getColor(),
//                 'x': player.getX(),
//                 'y': player.getY()
//             }));
//         }
//
//         function sendMovementDown(action: string) {
//             // let id = getUserId();
//             let id = player.getUserId();
//             player.setAction('ArrowDown');
//
//             client.send(`/app/movement/${id}`, {}, JSON.stringify({
//                 'action': player.getAction(),
//                 'userId': player.getUserId(),
//                 'color': player.getColor(),
//                 'x': player.getX(),
//                 'y': player.getY()
//             }));
//         }
//
//         function sendMovementLeft(action: string) {
//             // let id = getUserId();
//             let id = player.getUserId();
//             player.setAction('ArrowLeft');
//
//             client.send(`/app/movement/${id}`, {}, JSON.stringify({
//                 'action': player.getAction(),
//                 'userId': player.getUserId(),
//                 'color': player.getColor(),
//                 'x': player.getX(),
//                 'y': player.getY()
//             }));
//         }
//
//         function sendMovementRight(action: string) {
//             let id = player.getUserId();
//             player.setAction('ArrowRight');
//
//             client.send(`/app/movement/${id}`, {}, JSON.stringify({
//                 'action': player.getAction(),
//                 'userId': player.getUserId(),
//                 'color': player.getColor(),
//                 'x': player.getX(),
//                 'y': player.getY()
//             }));
//         }
//
//         function callback(action: string, id: string, color: string, x: number, y: number) {
//             let existingPlayer = otherPlayers.find((player) => player.getUserId() === id);
//
//             if (id === player.getUserId()) {
//                 if (action === 'ArrowUp') {
//                     player.setY(y);
//                     // player.setX(x - 1);
//                     // player.setY(y - 1);
//                     // player.draw(context);
//                     // xPos = xPos - 1;
//                 } else if (action === 'ArrowDown') {
//                     player.setY(y);
//                     // player.setX(x + 1);
//                     // player.setY(y + 1);
//                     // player.draw(context);
//
//                     // xPos = xPos + 1;
//                 } else if (action === 'ArrowLeft') {
//                     player.setX(x);
//                     // player.setY(y - 1);
//                     // player.setX(x - 1);
//                     // player.draw(context);
//
//                     // yPos = yPos - 1;
//                 } else if (action === 'ArrowRight') {
//                     player.setX(x);
//                     // player.setY(y + 1);
//                     // player.setX(x + 1);
//                     // player.draw(context);
//
//                     // yPos = yPos + 1;
//                 }
//                 // gameLoop();
//             } else if(existingPlayer) {
//                 if (action === 'ArrowUp') {
//                     existingPlayer.setX(x);
//                     existingPlayer.setY(y);
//                     existingPlayer.setAction(action);
//                     existingPlayer.draw(context);
//                     // TODO return einfügen
//                 } else if (action === 'ArrowDown') {
//                     existingPlayer.setX(x);
//                     existingPlayer.setY(y);
//                     existingPlayer.setAction(action);
//                     existingPlayer.draw(context);
//                 } else if (action === 'ArrowLeft') {
//                     existingPlayer.setY(y);
//                     existingPlayer.setX(x);
//                     existingPlayer.setAction(action);
//                     existingPlayer.draw(context);
//                 } else if (action === 'ArrowRight') {
//                     existingPlayer.setY(y);
//                     existingPlayer.setX(x);
//                     existingPlayer.setAction(action);
//                     existingPlayer.draw(context);
//                 }
//             } else {
//                 const newPlayer = new Player(action, id, color, x, y);
//                 otherPlayers.pop();
//                 otherPlayers.push(newPlayer);
//                 // newPlayer.draw(context);
//                 // drawGrid(map);
//                 // otherPlayers.forEach((newPlayer) => {
//                 //     if (newPlayer.getUserId() === id) {
//                 //         if (action === 'ArrowUp') {
//                 //             newPlayer.setX(x - 1);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setY(y);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setAction(action);
//                 //             return;
//                 //             // TODO return einfügen
//                 //         } else if (action === 'ArrowDown') {
//                 //             newPlayer.setX(x + 1);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setY(y);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setAction(action);
//                 //             newPlayer.draw(context);
//                 //             return;
//                 //
//                 //         } else if (action === 'ArrowLeft') {
//                 //             newPlayer.setY(y - 1);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setX(x);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setAction(action);
//                 //             newPlayer.draw(context);
//                 //             return;
//                 //
//                 //         } else if (action === 'ArrowRight') {
//                 //             newPlayer.setY(y + 1);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setX(x);
//                 //             newPlayer.draw(context);
//                 //             newPlayer.setAction(action);
//                 //             newPlayer.draw(context);
//                 //             return;
//                 //
//                 //         }
//                 //         // gameLoop();
//                 //
//                 //     }
//                 // });
//             }
//         }
//
//         const startGameLoop = () => {
//             requestAnimationFrame(() => gameLoop());
//         }
//
//         const gameLoop = () => {
//             clearScreen();
//             drawGrid(map);
//             player.draw(context);
//             // if(otherPlayers.length > 0) {
//             //     otherPlayers.forEach((newPlayer) => {
//             //         newPlayer.draw(context);
//             //     });
//             // }
//             requestAnimationFrame(() => gameLoop());
//         }
//
//         const clearScreen = () => {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//         }
//
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         if (!context) {
//             console.error("Could not get canvas context");
//             return;
//
//         } else {
//             drawGrid(map);
//         }
//         startGameLoop();
//
//         // TODO Logik Fehler bei der Bewegung der anderen Spieler
//         // TODO X und Y Parameter sind um 1 verschoben
//         function drawGrid(grid: number[][]) {
//             let cellSize = 25;
//             const context = canvasRef.current.getContext('2d');
//             if (!context) {
//                 console.error("Could not get canvas context");
//                 return;
//             }
//
//             for (let row = 0; row < grid.length; row++) {
//                 for (let col = 0; col < grid[row].length; col++) {
//                     const value = grid[row][col];
//                     if (value === 1) {
//                         context.fillStyle = 'black';
//                     } else if (value === 0) {
//                         context.fillStyle = 'white';
//                     } else if (value === 2) {
//                         context.fillStyle = 'purple';
//                     }
//                     context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
//                     context.strokeStyle = 'grey';
//                     context.lineWidth = 1;
//                     context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
//                 }
//             }
//
//             let x = player.getX();
//             let y = player.getY();
//             context.fillStyle = player.getColor();
//             context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//
//             for (let i = 0; i < otherPlayers.length; i++) {
//                 let playerX = otherPlayers[i].getX();
//                 let playerY = otherPlayers[i].getY();
//                 context.fillStyle = otherPlayers[i].getColor();
//                 context.fillRect(playerX * cellSize, playerY * cellSize, cellSize, cellSize);
//             }
//         }
//
//         window.addEventListener('keydown', (event) => {
//             handleMove(event.key);
//         });
//     return (
//         <div className="background">
//
//             <div className="grid grid-rows-10 h-screen w-screen  ">
//                 <div className="row-span-1 ">
//
//                     <p className="text-center text-white text-5xl mt-3">Game</p>
//                 </div>
//                 <div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">
//
//                     <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-end">
//                         <p className="font-bold m-10 underline-offset-1">Completed Tasks</p>
//                     </div>
//                     <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
//                         <canvas ref={canvasRef} width="775" height="600" style={{ backgroundColor: 'blue' }}/>
//                     </div>
//                     <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">
//                         <button
//                             className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings
//                         </button>
//                         <button
//                             className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Map
//                         </button>
//                         <button
//                             onClick={onQuit} className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Quit
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
//
// };
//
//
//
// export default GameComponent;




























































import { Player } from "./Player";
import {useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import '../main.css';
import '../output.css';

let otherPlayers: Player[] = [];
let clientId = "";


type Props ={
    onQuit(): void;
}

const GameComponent = ({xPos, yPos, onMove, onQuit}) => {


    const canvasRef = useRef(null);

    const player = useRef(new Player("", "",'', 2, 2));
    const [playerOne, setPlayerOne] = useState(false);
    const [signIn, setSignIn] = useState(false);

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    useEffect(() => {

        // let id = getUserId();
        // let id = player.getUserId();

        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/register/', (message) => {
                console.log('register....')
                const response = JSON.parse(message.body);

                console.log('Player went online:', response.sessionId + ' ' + response.userId + ' ' + response.color + ' ' + response.x + ' ' + response.y);

                    if(player.current.getUserId() === '' && player.current.getColor() === '') {
                    player.current = null;
                    player.current = new Player(response.action, response.userId, response.color, response.x, response.y);
                    player.current.setAction(response.action);
                    player.current.setUserId(response.userId);
                    player.current.setColor(response.color);
                    player.current.setX(response.x);
                    player.current.setY(response.y);
                    gameLoop();
                } else if(player.current.getUserId() !== response.userId) {
                    const existingPlayer = otherPlayers.find((player) => player.getUserId() === response.userId);
                    if(!existingPlayer) {
                        const newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
                        otherPlayers.push(newPlayer);
                        console.log('other player created ' + otherPlayers.entries());
                        gameLoop();
                    }
                }
            });

            if(!signIn) {
                client.send('/app/register/', {}, JSON.stringify({
                        // client.send(`/app/register/${player.current.getUserId()}`, {}, JSON.stringify({
                        'action': player.current.getAction(),
                        'userId': player.current.getUserId(),
                        'color': player.current.getColor(),
                        'x': player.current.getX(),
                        'y': player.current.getY()
                    })
                );
                client.subscribe('topic/getAllPlayers/', (message) => {
                    const response = JSON.parse(message.body);
                    console.log('get all players ' + response);
                    otherPlayers = response;
                    gameLoop();
                });
                setSignIn(true);
            }

            client.subscribe('/topic/disconnected/', (message) => {
                const response = JSON.parse(message.body);
                const id = response.userId;
                const index = otherPlayers.findIndex(player => player.getUserId() === response.userId);

                if (index !== -1) {
                    otherPlayers.splice(index, 1);
                    console.log('Player with ID ' + response.userId + ' was removed from otherPlayers');
                    //:q how to print all Player from otherPlayers?
                    //q: how to print all Player from otherPlayers?
                    otherPlayers.forEach(player => {
                        console.log(player);
                    });

                    gameLoop();
                }
            });

            client.subscribe('topic/newPlayer/', (message) => {
                const response = JSON.parse(message.body);
                const id = response.userId;
                const color = response.color;
                const x = response.x;
                const y = response.y;
                const action = response.action;
                const newPlayer = new Player(action, id, color, x, y);
                otherPlayers.push(newPlayer);
                console.log('new player created ' + otherPlayers.entries());
                gameLoop();
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
                // otherPlayers.pop();
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

export default GameComponent;
