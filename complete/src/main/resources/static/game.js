import { Player } from "./gameMovement.js";

let otherPlayers = [];
let userId = "";
let userColor = "";

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.player = new Player(100, 100, 50, 50, 'blue');
        this.randomString = this.generateRandomString(10);
        this.userId = this.randomString;
        this.setupKeyboardControls();
        this.initializeWebSocket();

        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        this.startGameLoop();
    }

    initializeWebSocket() {
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
            onConnect: () => {
                this.subscribeToTopics();
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        this.stompClient.activate();
    }

    subscribeToTopics() {
        this.stompClient.subscribe("/topic/register/", this.registerCallback);

        this.stompClient.publish({
            destination: `/app/register/${this.userId}`,
            body: JSON.stringify({ 'userId': this.userId })
        });
        // setTimeout(() => {
        //     this.stompClient.unsubscribe("/topic/register/", this.registerCallback);
        // } , 1000);

        this.stompClient.subscribe("/topic/movement/", this.callback);
    }

    registerCallback = (message) => {
        const parsedMessage = JSON.parse(message.body);
        this.player.color = parsedMessage.color;
        this.player.x = parsedMessage.x;
        this.player.y = parsedMessage.y;
        this.player.userId = parsedMessage.userId;
        this.stompClient.unsubscribe("/topic/register/");
    }

    callback = (message) => {
        const parsedMessage = JSON.parse(message.body);
        const existingPlayers = otherPlayers.find(player => player.userId);

        if (parsedMessage.userId === this.userId) {
            switch (parsedMessage.action) {
                case 'left':
                    this.player.moveLeft(parsedMessage.x);
                    break;
                case 'right':
                    this.player.moveRight(parsedMessage.x);
                    break;
                case 'up':
                    this.player.moveUp(parsedMessage.y);
                    break;
                case 'down':
                    this.player.moveDown(parsedMessage.y);
                    break;
                default:
                    console.log("Unbekannte Aktion");
            }
        } else if(existingPlayers) {
            updateOtherPlayerPosition(parsedMessage.x, parsedMessage.y, parsedMessage.userId, parsedMessage.action);
        } else {
            let newPlayer = new Player(parsedMessage.x, parsedMessage.y, 50, 50, parsedMessage.color, parsedMessage.userId);
            otherPlayers.push(newPlayer);
        }
    };

    sendMovementRight() {
        this.stompClient.publish({
            destination: `/app/movement/${this.userId}`,
            body: JSON.stringify({ 'action': 'right',
                                        'x': this.player.x,
                                        'y': this.player.y,
                                        'color': this.player.color,
                                        'userId': this.userId })
        });
    }

    sendMovementLeft() {
        this.stompClient.publish({
            destination: `/app/movement/${this.userId}`,
            body: JSON.stringify({ 'action': 'left',
                                        'x': this.player.x,
                                        'y': this.player.y,
                                        'color': this.player.color,
                                        'userId': this.userId })
        });
    }

    sendMovementUp() {
        this.stompClient.publish({
            destination: `/app/movement/${this.userId}`,
            body: JSON.stringify({ 'action': 'up',
                                        'x': this.player.x,
                                        'y': this.player.y,
                                        'color': this.player.color,
                                        'userId': this.userId })
        });
    }

    sendMovementDown() {
        this.stompClient.publish({
            destination: `/app/movement/${this.userId}`,
            body: JSON.stringify({ 'action': 'down',
                                        'x': this.player.x,
                                        'y': this.player.y,
                                        'color': this.player.color,
                                        'userId': this.userId })
        });
    }

    connect()
    {
        this.stompClient.activate();
    }

    disconnect()
    {
        this.stompClient.deactivate();
        this.stompClient.setConnected(false);
        console.log("Disconnected");
    }

    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    startGameLoop() {
        requestAnimationFrame(() => this.gameLoop());
    }
    gameLoop() {
        this.clearScreen();
        this.drawMap();
        this.player.draw(this.context);

        if(otherPlayers.length > 0) {
            otherPlayers.forEach((newPlayer) => {
                newPlayer.draw(this.context);
            });
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawPlayer() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
    drawMap() {
        const tileSize = 25;
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                if (this.map[row][col] === 1) {
                    this.context.fillStyle = 'black';
                }
                else {
                    this.context.fillStyle = 'white';
                }
                this.context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                this.context.strokeStyle = 'grey';
                this.context.lineWidth = 1;
                this.context.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }

    setupKeyboardControls() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    console.log("left");
                    this.sendMovementLeft();
                    break;
                case 'ArrowRight':
                    this.sendMovementRight();
                    break;
                case 'ArrowUp':
                    this.sendMovementUp();
                    break;
                case 'ArrowDown':
                    this.sendMovementDown();
                    break;
            }
        });
    }
}

function updateOtherPlayerPosition(x, y, userId, action) {
    const player = otherPlayers.find(player => player.userId);

    switch (action) {
        case 'left':
            player.moveLeft(x);
            break;
        case 'right':
            player.moveRight(x);
            break;
        case 'up':
            player.moveUp(y);
            break;
        case 'down':
            player.moveDown(y);
            break;
        default:
            console.log("Other Player Unbekannte Aktion");
    }
}

window.onload = () => {
    new Game("map");
};