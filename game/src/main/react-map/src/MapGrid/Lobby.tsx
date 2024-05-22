import React, {useEffect, useState} from 'react';
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
import pink777 from "../Images/Character_Red_Movement/Red_East_Rigth.png";
import dead from "../Images/Character_Movement/dead.png";
import killButton from "../Images/Buttons/Kill_Button.jpg";

import mapImage from '../Images/Maps/Lobby.png';


interface MapGridProps {
    currentPlayer: Player;
    otherPlayers: Player[];
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
    dead: dead,
};

const MapGrid: React.FC<MapGridProps> = ({currentPlayer, otherPlayers}) => {
    const [gridKey, setGridKey] = useState(0);
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[currentPlayer.getColor()]);
    const [otherPlayerImages, setOtherPlayerImages] = useState({});
    const [playerPosition, setPlayerPosition] = useState({ x: currentPlayer.getX(), y: currentPlayer.getY() });
    const [otherPlayerPositions, setOtherPlayerPositions] = useState(
        otherPlayers.reduce((acc, player) => {
            acc[player.getSessionId()] = { x: player.getX(), y: player.getY() };
            return acc;
        }, {})
    );

    useEffect(() => {
        // Update the key whenever currentPlayer or otherPlayers change
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
        if (!player.getMovable()) {
            newImage = colorToImageUrl['dead'];
            newImage = lime;
        } else if (player.getColor() === 'dead') {
            newImage = colorToImageUrl['dead'];
        } else {
            // newImage = lime;
            newImage = colorToImageUrl[player.getColor()];
        }
        setOtherPlayerImages(prevImages => ({...prevImages, [player.getSessionId()]: newImage}));
    };

    const grid: any[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    useEffect(() => {
        setPlayerPosition({ x: currentPlayer.getX(), y: currentPlayer.getY() });
        setOtherPlayerPositions(
            otherPlayers.reduce((acc, player) => {
                acc[player.getSessionId()] = { x: player.getX(), y: player.getY() };
                return acc;
            }, {})
        );
    }, [currentPlayer, otherPlayers]);


    const movePlayer = (x, y) => {
        if (grid[y] && grid[y][x] === 0) { // Check if the target cell is walkable
            setPlayerPosition({ x, y });
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerPosition]);

    const handleKeyDown = (event) => {
        const { x, y } = playerPosition;
        let newX = x;
        let newY = y;
        switch (event.key) {
            case 'ArrowUp':
                newY = y - 1;
                break;
            case 'ArrowDown':
                newY = y + 1;
                break;
            case 'ArrowLeft':
                newX = x - 1;
                break;
            case 'ArrowRight':
                newX = x + 1;
                break;
            default:
                return;
        }
        if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[newY].length && grid[newY][newX] === 0) {
            setPlayerPosition({ x: newX, y: newY });
        }
    };

    return (
        <div className={style.mapContainer} style={{
            position: 'relative',
            width: '130%',
            height: '130%',
            top: '180px',
            left: '20px',
            // transform: 'translate(-50%, -50%)',
            overflow: 'auto',
            overflowX: 'auto',
            overflowY: 'auto',
            backgroundImage: `url(${mapImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>

            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => {
                        const cellStyle = cell === 1
                            ? {
                            //backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                width: '30px', height: '30px' }
                            : { width: '30px', height: '30px' };
                        return <div key={colIndex} style={cellStyle}></div>;
                    })}
                </div>
            ))}

            <div className={style.playerIcon} style={{
                left: `${playerPosition.x * 30}px`,
                top: `${playerPosition.y * 30}px`,
                backgroundImage: `url(${playerImage})`,
                backgroundSize: 'cover',
                width: '30px',
                height: '30px',
                position: 'absolute'
            }}/>

            {otherPlayers.map(player => (
                <div key={player.getSessionId()} className={style.playerIcon} style={{
                    left: `${player.getX() * 30}px`,  // Multiply by cell width
                    top: `${player.getY() * 30}px`,  // Multiply by cell height
                    backgroundImage: `url(${colorToImageUrl[player.getColor()]})`,
                    backgroundSize: 'cover',
                    width: '30px',
                    height: '30px',
                    position: 'absolute'
                }}/>
            ))}
        </div>
    );
};

export default MapGrid;
