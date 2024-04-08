import { Player } from "./Player";
import {useEffect, useRef, useState} from "react";
import {getAction, getColor, getUserId, getX, getY} from "../store";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import '../main.css'
import '../output.css';

let otherPlayers: Player[] = [];

const GameComponent = (/*{xPos, yPos, onMove}*/) => {

    const canvasRef = useRef(null);

    const player = useRef(new Player("", "11",'blue', 7, 7));
    const [playerOne, setPlayerOne] = useState(false);

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/register/', (message) => {
                const response = JSON.parse(message.body);

                if(player.current.getUserId() === '11') {
                    player.current.setAction(response.action);
                    player.current.setUserId(response.userId);
                    player.current.setColor(response.color);
                    player.current.setX(response.x);
                    player.current.setY(response.y);
                    player.current.draw(context);
                    setPlayerOne(true);
                } else if(player.current.getUserId() !== response.userId && setPlayerOne) {
                    let existingPlayer = otherPlayers.find((player) => player.getUserId() === response.userId);
                    if(!existingPlayer) {
                        let newPlayer = new Player(response.action, response.userId, response.color, response.x, response.y);
                        otherPlayers.push(newPlayer);
                        newPlayer.draw(context);
                    }
                } /* else if(response.connected === false) {
                    const index = otherPlayers.findIndex(player => player.getUserId() === response.userId);
                    if (index !== -1) {
                        otherPlayers.splice(index, 1);
                    }
                } */
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
                    sendMovementUp(player.current.getY());
                    break;
                case 'ArrowDown':
                    sendMovementDown(player.current.getY());
                    break;
                case 'ArrowLeft':
                    sendMovementLeft(player.current.getX());
                    break;
                case 'ArrowRight':
                    sendMovementRight(player.current.getX());
                    break;
                default:
                    break;
            }
        };

        function sendMovementUp(y: number) {
            let id = player.current.getUserId();
            player.current.setAction('ArrowUp');

            client.send(`/app/movement/${player.current.getUserId()}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY() //- 1
            }));
        }

        function sendMovementDown(y: number) {
            let id = player.current.getUserId();
            player.current.setAction('ArrowDown');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX(),
                'y': player.current.getY() //+ 1
            }));
        }

        function sendMovementLeft(x: number) {
            let id = player.current.getUserId();
            player.current.setAction('ArrowLeft');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX() ,//- 1,
                'y': player.current.getY()
            }));
        }

        function sendMovementRight(x: number) {
            let id = player.current.getUserId();
            player.current.setAction('ArrowRight');

            client.send(`/app/movement/${id}`, {}, JSON.stringify({
                'action': player.current.getAction(),
                'userId': player.current.getUserId(),
                'color': player.current.getColor(),
                'x': player.current.getX() ,//+ 1,
                'y': player.current.getY()
            }));
        }

        function callback(action: string, id: string, color: string, x: number, y: number) {
            let existingPlayer = otherPlayers.find((player) => player.getUserId() === id);

            if (id === player.current.getUserId()) {
                if (action === 'ArrowUp') {
                    player.current.setX(x);
                    player.current.setY(y);
                    player.current.draw(context);
                } else if (action === 'ArrowDown') {
                    player.current.setX(x);
                    player.current.setY(y);
                    player.current.draw(context);
                } else if (action === 'ArrowLeft') {
                    player.current.setX(x);
                    player.current.setY(y);
                    player.current.draw(context);
                } else if (action === 'ArrowRight') {
                    player.current.setX(x);
                    player.current.setY(y);
                    player.current.draw(context);
                }
            } else if(existingPlayer) {
                existingPlayer.setAction(action);
                existingPlayer.setX(x);
                existingPlayer.setY(y);
                existingPlayer.draw(context);
            } else if(!existingPlayer && id !== player.current.getUserId()) {
                const newPlayer = new Player(action, id, color, x, y);
                otherPlayers.push(newPlayer);
                newPlayer.draw(context);
            }
        }

        function createMap(canvas: HTMLCanvasElement, mapData: any) {
            const ctx = canvasRef.current.getContext('2d');
            // const ctx = canvas.getContext('2d');
            if (!ctx) return; // Wenn der Kontext nicht abgerufen werden kann, beende die Funktion.

            const tileWidth = mapData.tilewidth;
            const tileHeight = mapData.tileheight;
            const columns = mapData.columns;
            // Annehmen, dass die Map gleichmäßig aufgeteilt ist, könnte man die Anzahl der Reihen berechnen (nicht direkt aus den Daten).
            const rows = Math.ceil(mapData.tilecount / columns);

            canvas.width = columns * tileWidth;
            canvas.height = rows * tileHeight;

            // Einfaches Zeichnen jeder Tile als Rechteck
            mapData.tiles.forEach((tile: any) => {
                // Berechne die Position basierend auf der Tile-ID
                const x = (tile.id % columns) * tileWidth;
                const y = Math.floor(tile.id / columns) * tileHeight;

                // Zeichne ein Rechteck für jede Tile
                ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'; // Blau als Beispiel
                ctx.fillRect(x, y, tileWidth, tileHeight);

                // Wenn du spezielle Logik basierend auf den Objektgruppen hinzufügen möchtest, kannst du das hier tun.
            });
        }

        const startGameLoop = () => {
            requestAnimationFrame(() => gameLoop());
        }

        const gameLoop = () => {
            clearScreen();
            drawGrid(map);
            requestAnimationFrame(() => gameLoop());
        }

        const clearScreen = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        const canvas = canvasRef.current;
        // createMap(canvasRef.current, mapData);
        const context = canvas.getContext('2d');
        if (!context) {
            console.error("Could not get canvas context");
            return;
        } else {
            drawGrid(map);
        }
        startGameLoop();

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
                        context.fillStyle = 'grey';
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
                let x = otherPlayers[i].getX();
                let y = otherPlayers[i].getY();
                context.fillStyle = otherPlayers[i].getColor();
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        window.addEventListener('keydown', (event) => {
            handleMove(event.key);
        });
        }, []);

    return (
        <div>
            <div className="background grid grid-rows-12 min-h-screen w-screen p-10" style={{position: 'relative', zIndex: 1}}/>
            <canvas ref={canvasRef} width="775" height="600" style={{position: 'absolute', zIndex: 2, top: 100, left: 25}}/>

        </div>
    );
};

export default GameComponent;
