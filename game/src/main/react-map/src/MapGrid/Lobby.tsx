import React, {useEffect, useRef, useState} from 'react';
import style from '../CSS/MapGridStyle.module.css';
import {Player} from '../Player';
import purple from "../Images/Character_Movement/Purple.png";
import red from "../Images/Character_Movement/red.jpg";
import blue from "../Images/Character_Movement/Blue.jpg";
import green from "../Images/Character_Movement/Green.jpg";
import orange from "../Images/Character_Movement/Orange.jpg";
import yellow from "../Images/Character_Movement/Yellow.png";
import black from "../Images/Character_Movement/Black.jpg";
import white from "../Images/Character_Movement/White.jpg";
import brown from "../Images/Character_Movement/Brown.jpg";
import cyan from "../Images/Character_Movement/Cyan.jpg";
import lime from "../Images/Character_Movement/Lime.jpg";
import pink from "../Images/Character_Movement/Pink.jpg";

import lobbyImage from '../Images/Maps/Lobby.png';

import redImageUp from "../Images/Character_Red_Movement/Red_North_Stand.png";
import redImageUp2 from "../Images/Character_Red_Movement/Red_North_Right.png";
import redImageDown from "../Images/Character_Red_Movement/Red_South_Left.png";
import redImageDown2 from "../Images/Character_Red_Movement/Red_South_Right.png";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import votingboxButton from "../Images/Votingbox/report_player.png";
import skeldImage from "../Images/Maps/Skeld.png";
import redImageRight from "../Images/Character_Red_Movement/Red_East_Rigth.png";
import blueImageRight from "../Images/Character_Blue_Movement/Blue_East_Right.png";
import cyanImageRight from "../Images/Character_Cyan_Movement/Cyan_East_Right.png";
import yellowImageRight from "../Images/Character_Yellow_Movement/Yellow_East_Right.png";
import purpleImageRight from "../Images/Character_Purple_Movement/Purple_East_Right.png";
import limeImageRight from "../Images/Character_Lime_Movement/Lime_East_Right.png";
import greenImageRight from "../Images/Character_Green_Movement/Green_East_Right.png";
import pinkImageRight from "../Images/Character_Pink_Movement/Pink_East_Right.png";
import orangeImageRight from "../Images/Character_Orange_Movement/Orange_East_Right.png";
import whiteImageRight from "../Images/Character_White_Movement/White_East_Right.png";
import blackImageRight from "../Images/Character_Black_Movement/Black_East_Right.png";
import brownImageRight from "../Images/Character_Brown_Movement/Brown_East_Right.png";
import redImageRight2 from "../Images/Character_Red_Movement/Red_East_Left.png";
import blueImageRight2 from "../Images/Character_Blue_Movement/Blue_East_Left.png";
import cyanImageRight2 from "../Images/Character_Cyan_Movement/Cyan_East_Left.png";
import yellowImageRight2 from "../Images/Character_Yellow_Movement/Yellow_East_Left.png";
import purpleImageRight2 from "../Images/Character_Purple_Movement/Purple_East_Left.png";
import limeImageRight2 from "../Images/Character_Lime_Movement/Lime_East_Left.png";
import greenImageRight2 from "../Images/Character_Green_Movement/Green_East_Left.png";
import pinkImageRight2 from "../Images/Character_Pink_Movement/Pink_East_Left.png";
import orangeImageRight2 from "../Images/Character_Orange_Movement/Orange_East_Left.png";
import whiteImageRight2 from "../Images/Character_White_Movement/White_East_Left.png";
import blackImageRight2 from "../Images/Character_Black_Movement/Black_East_Left.png";
import brownImageRight2 from "../Images/Character_Brown_Movement/Brown_East_Left.png";
import redImageLeft from "../Images/Character_Red_Movement/Red_West_Left.png";
import blueImageLeft from "../Images/Character_Blue_Movement/Blue_West_Left.png";
import cyanImageLeft from "../Images/Character_Cyan_Movement/Cyan_West_Left.png";
import yellowImageLeft from "../Images/Character_Yellow_Movement/Yellow_West_Left.png";
import purpleImageLeft from "../Images/Character_Purple_Movement/Purple_West_Left.png";
import limeImageLeft from "../Images/Character_Lime_Movement/Lime_West_Left.png";
import greenImageLeft from "../Images/Character_Green_Movement/Green_West_Left.png";
import pinkImageLeft from "../Images/Character_Pink_Movement/Pink_West_Left.png";
import orangeImageLeft from "../Images/Character_Orange_Movement/Orange_West_Left.png";
import whiteImageLeft from "../Images/Character_White_Movement/White_West_Left.png";
import blackImageLeft from "../Images/Character_Black_Movement/Black_West_Left.png";
import brownImageLeft from "../Images/Character_Brown_Movement/Brown_West_Left.png";
import redImageLeft2 from "../Images/Character_Red_Movement/Red_West_Right.png";
import blueImageLeft2 from "../Images/Character_Blue_Movement/Blue_West_Right.png";
import cyanImageLeft2 from "../Images/Character_Cyan_Movement/Cyan_West_Right.png";
import yellowImageLeft2 from "../Images/Character_Yellow_Movement/Yellow_West_Right.png";
import purpleImageLeft2 from "../Images/Character_Purple_Movement/Purple_West_Right.png";
import limeImageLeft2 from "../Images/Character_Lime_Movement/Lime_West_Right.png";
import greenImageLeft2 from "../Images/Character_Green_Movement/Green_West_Right.png";
import pinkImageLeft2 from "../Images/Character_Pink_Movement/Pink_West_Right.png";
import orangeImageLeft2 from "../Images/Character_Orange_Movement/Orange_West_Right.png";
import whiteImageLeft2 from "../Images/Character_White_Movement/White_West_Right.png";
import blackImageLeft2 from "../Images/Character_Black_Movement/Black_West_Right.png";
import brownImageLeft2 from "../Images/Character_Brown_Movement/Brown_West_Right.png";

interface MapGridProps {
    currentPlayer: Player;
    otherPlayers: any[];
}

const colorToImageUrl = {
    purple: purple,
    red: red,
    blue: blue,
    green: green,
    orange: orange,
    yellow: yellow,
    black: black,
    white: white,
    brown: brown,
    cyan: cyan,
    lime: lime,
    pink: pink,
};

const Lobby: React.FC<MapGridProps> = ({currentPlayer, otherPlayers}) => {

    const [gridKey, setGridKey] = useState(0);
    const [otherPlayerImages, setOtherPlayerImages] = useState({});
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[currentPlayer.getColor()]);
    const [playerPosition, setPlayerPosition] = useState({ y: currentPlayer.getY(), x: currentPlayer.getX() });
    const containerRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [playerDirection, setPlayerDirection] = useState('');
    const [otherPlayer, setOtherPlayer] = useState(otherPlayers);

    useEffect(() => {
        const updateScrollPosition = () => {
            if (containerRef.current && canvasRef.current) {
                const centerX = containerRef.current.offsetWidth / 2;
                const centerY = containerRef.current.offsetHeight / 2;

                const playerX = currentPlayer.getX() * 30;
                const playerY = currentPlayer.getY() * 30;

                containerRef.current.scrollLeft = playerX - centerX;
                containerRef.current.scrollTop = playerY - centerY;
            }
        };
        updateScrollPosition();
    }, [currentPlayer.getX(), currentPlayer.getY()]);

    useEffect(() => {
        let imageSrc;
        switch (playerDirection) {
            case 'right':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageRight;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageRight;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageRight;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageRight;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageRight;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageRight;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageRight;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageRight;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageRight;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageRight;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageRight;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageRight;
                } else {
                    imageSrc = redImageRight;
                }
                break;
            case 'right2':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageRight2;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageRight2;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageRight2;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageRight2;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageRight2;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageRight2;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageRight2;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageRight2;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageRight2;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageRight2;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageRight2;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageRight2;
                } else {
                    imageSrc = redImageRight2;
                }
                break;
            case 'left':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageLeft;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageLeft;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageLeft;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageLeft;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageLeft;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageLeft;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageLeft;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageLeft;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageLeft;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageLeft;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageLeft;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageLeft;
                } else {
                    imageSrc = redImageLeft;
                }
                break;
            case 'left2':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageLeft2;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageLeft2;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageLeft2;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageLeft2;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageLeft2;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageLeft2;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageLeft2;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageLeft2;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageLeft2;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageLeft2;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageLeft2;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageLeft2;
                } else {
                    imageSrc = redImageLeft2;
                }
                break;
            case 'up':
                imageSrc = redImageUp;
                break;
            case 'up2':
                imageSrc = redImageUp2;
                break;
            case 'down':
                imageSrc = redImageDown;
                break;
            case 'down2':
                imageSrc = redImageDown2;
                break;
            default:
                imageSrc = redImageRight;
        }

        setPlayerImage(imageSrc);
    }, [playerDirection]);

    const [loadedImage, setLoadedImage] = useState(null);

    useEffect(() => {
        const image = new Image();
        image.src = lobbyImage;
        image.onload = () => {
            setLoadedImage(image);
        };
    }, [skeldImage]);

    useEffect(() => {
        setGridKey(prevKey => prevKey + 1);
    }, [currentPlayer, otherPlayers]);

    const playerImages = {
        red: "../images/Character_Movement/red.jpg",
        cyan: "../images/Character_Movement/Cyan.jpg",
        lime: "../images/Character_Movement/Lime.jpg",
        pink: "../images/Character_Movement/Pink.jpg",
        gray: "../images/Character_Movement/Gray.jpg",
        blue: "../images/Character_Movement/Blue.jpg",
        green: "../images/Character_Movement/Green.jpg",
        black: "../images/Character_Movement/Black.jpg",
        white: "../images/Character_Movement/White.jpg",
        brown: "../images/Character_Movement/Brown.jpg",
        orange: "../images/Character_Movement/Orange.jpg",
        yellow: "../images/Character_Movement/Yellow.jpg",
        purple: "../images/Character_Movement/Purple.png",
        dead: "../images/Character_Movement/dead.png",
    };

    useEffect(() => {
        setPlayerImage(colorToImageUrl[currentPlayer.getColor()]);
    }, [currentPlayer.getColor()]);

    useEffect(() => {
        otherPlayers.forEach(player => {
            updatePlayerImage(player);
        });
    }, [otherPlayers]);

    const updatePlayerImage = (player) => {
        let newImage;
        newImage = colorToImageUrl[player.getColor()];
        setOtherPlayerImages(prevImages => ({...prevImages, [player.getSessionId()]: newImage}));
    };

    const grid: any[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const visibilityRadius = 5;

    function isCellVisible(playerX, playerY, cellX, cellY) {
        const distance = Math.abs(cellX - playerX) + Math.abs(cellY - playerY);
        return distance <= visibilityRadius;
    }

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            const image = new Image();
            image.src = lobbyImage;

            image.onload = () => {
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                const scaleFactor = 1;
                context.scale(scaleFactor, scaleFactor);

                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
            };
        }
    }, [currentPlayer, lobbyImage]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe(`/topic/movement/lobby/north/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);

                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
                setPlayerPosition({ x: response.x, y: response.y });
                if (currentPlayer.getY() % 2 === 0) {
                    setPlayerDirection('up');
                } else if (currentPlayer.getY() % 2 !== 0) {
                    setPlayerDirection('up2');
                }
            });

            client.subscribe(`/topic/movement/lobby/south/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
                setPlayerPosition({ x: response.x, y: response.y });
                if (currentPlayer.getY() % 2 === 0) {
                    setPlayerDirection('down');
                } else if (currentPlayer.getY() % 2 !== 0) {
                    setPlayerDirection('down2');
                }
            });

            client.subscribe(`/topic/movement/lobby/west/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
                setPlayerPosition({ x: response.x, y: response.y });
                // setPlayerDirection('left');
                if (currentPlayer.getY() % 2 === 0) {
                    setPlayerDirection('left');
                } else if (currentPlayer.getY() % 2 !== 0) {
                    setPlayerDirection('left2');
                }
            });

            client.subscribe(`/topic/movement/lobby/east/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
                setPlayerPosition({ x: response.x, y: response.y });
                if (currentPlayer.getX() % 2 === 0) {
                    setPlayerDirection('right');
                } else if (currentPlayer.getX() % 2 !== 0) {
                    setPlayerDirection('right2');
                }
            });

            client.subscribe('/topic/movement/lobby/north/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                console.log(response.userName + '  ' + response.sessionId)
                setOtherPlayer((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === response.sessionId) {
                            p.setX(response.x);
                            p.setY(response.y);
                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            });

            client.subscribe('/topic/movement/lobby/south/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                setOtherPlayer((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === response.sessionId) {
                            p.setX(response.x);
                            p.setY(response.y);
                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            });

            client.subscribe('/topic/movement/lobby/west/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                setOtherPlayer((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === response.sessionId) {
                            p.setX(response.x);
                            p.setY(response.y);
                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            });

            client.subscribe('/topic/movement/lobby/east/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                setOtherPlayer((prevOtherPlayers) => {
                    const updatedPlayers = prevOtherPlayers.map((p) => {
                        if (p.getSessionId() === response.sessionId) {
                            p.setX(response.x);
                            p.setY(response.y);
                        }
                        return p;
                    });
                    return updatedPlayers;
                })
            });

            // client.subscribe(`/topic/lobby/disconnect/${currentPlayer.getUserName()}`, () => {
            client.subscribe('/topic/startGame/', () => {

                console.log('UNSUBCRIBE IN LOBBY.TSX')

                client.unsubscribe(`/topic/movement/lobby/north/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movement/lobby/south/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movement/lobby/west/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movement/lobby/east/${currentPlayer.getUserName()}`);

                client.unsubscribe('/topic/movement/lobby/otherPlayer/');
                client.unsubscribe('/topic/movement/lobby/otherPlayer/');
                client.unsubscribe('/topic/movement/lobby/otherPlayer/');
                client.unsubscribe('/topic/movement/lobby/otherPlayer/');

                client.disconnect(() => {
                    console.log('DISCONNECTED IN LOBBY.TSX')
                });
            });
        });

        const handleMove = (event: string) => {
            switch (event) {
                case 'ArrowUp':
                    sendMovementNorth();
                    break;
                case 'ArrowDown':
                    sendMovementSouth();
                    break;
                case 'ArrowLeft':
                    sendMovementWest();
                    break;
                case 'ArrowRight':
                    sendMovementEast();
                    break;
                default:
                    break;
            }
        };

        function sendMovementNorth() {
            if(!currentPlayer.getMovable()) {
                return;
            } else {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                client.send(`/app/movement/lobby/north/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        function sendMovementSouth() {
            if(!currentPlayer.getMovable()) {
                return;
            } else {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                client.send(`/app/movement/lobby/south/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        function sendMovementWest() {
            if(!currentPlayer.getMovable()) {
                return;
            } else {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                client.send(`/app/movement/lobby/west/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        function sendMovementEast() {
            if(!currentPlayer.getMovable()) {
                return;
            } else {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                client.send(`/app/movement/lobby/east/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        window.addEventListener('keydown', (event) => {
            handleMove(event.key);
        });

        return () => {
            window.removeEventListener('keydown', (event) => {
                handleMove(event.key);
            });
        };
    }, [currentPlayer]);

    return (
        <div ref={containerRef} style={{
            position: 'absolute', width: '120%', height: '100%', top: 200, left: 400, overflow: 'auto',
            overflowX: 'hidden', overflowY: 'hidden'
        }}>
            <canvas ref={canvasRef} id="game" width="1600" height="1000"
                    style={{border: '1px solid black', display: 'block'}}></canvas>
            <div key={gridKey} className={style.root} style={{position: 'absolute', top: 50, left: 90}}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.row}>
                        {row.map((cell, colIndex) => {
                            const otherPlayer = otherPlayers.find(player => player.getX() === colIndex && player.getY() === rowIndex);
                            const cellContent = cell;
                            // const isVisible = isCellVisible(currentPlayer.getX(), currentPlayer.getY(), colIndex, rowIndex);

                            const cellStyle = {
                                backgroundSize: 'cover',
                                width: '30px',
                                height: '30px'
                            };

                            if (otherPlayer) {
                                const playerImage = otherPlayerImages[otherPlayer.getSessionId()];
                                return (
                                    <span style={{
                                        backgroundImage: `url(${playerImage})`,
                                        backgroundSize: 'cover',
                                        width: '30px',
                                        height: '30px'
                                    }}>
                                    </span>
                                );
                            } else if (rowIndex === currentPlayer.getY() && colIndex === currentPlayer.getX()) {
                                return (
                                    <span style=
                                              {{
                                                  backgroundImage: `url(${playerImage})`,
                                                  backgroundSize: 'cover',
                                                  width: '30px',
                                                  height: '30px'
                                              }}>
                                    </span>
                                );
                            }
                            return (
                                <span key={colIndex} className={style.cell} style={{...cellStyle, color: 'transparent', borderColor: 'transparent'}}>
                                {cellContent}
                            </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lobby;