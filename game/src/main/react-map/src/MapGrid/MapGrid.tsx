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
import dead from "../Images/Character_Movement/dead.png";
import killButton from "../Images/Buttons/Kill_Button.jpg";
import ghost from "../Images/Character_Movement/Ghost.jpg";


import mapImage from '../Images/Maps/Lobby.png';
import Votingbox from "../GameComponents/Votingbox";

import votingboxButton from '../Images/Votingbox/report_player.png';

interface MapGridProps {
    currentPlayer: Player;
    otherPlayers: Player[];
    reportButtonClicked: () => void;
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
    ghost: ghost
};

const MapGrid: React.FC<MapGridProps> = ({currentPlayer, otherPlayers, reportButtonClicked }) => {
    const [gridKey, setGridKey] = useState(0);
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[currentPlayer.getColor()]);
    const [otherPlayerImages, setOtherPlayerImages] = useState({});


    useEffect(() => {
        // Update the key whenever currentPlayer or otherPlayers change
        setGridKey(prevKey => prevKey + 1);
    }, [currentPlayer, otherPlayers]);

    const grid: any[][] = [
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '?', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '?    ', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '?', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '?', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '?', '#', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '.', '.', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ];

    const playerImages = {
        red: "../images/Character_Movement/red.jpg",
        dead: "../images/Character_Movement/dead.png",
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
        ghost: "../Images/Character_Movement/Ghost.jpg"
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

    const radius = 5;

    // Calculate sub-grid boundaries based on player position
    const startRow = Math.max(0, currentPlayer.getY() - radius);
    const endRow = Math.min(grid.length - 1, currentPlayer.getY() + radius);
    const startCol = Math.max(0, currentPlayer.getX() - radius);
    const endCol = Math.min(grid[0].length - 1, currentPlayer.getX() + radius);

    // Center View
    const paddingTop = Math.max(0, radius - (currentPlayer.getY() - startRow)) * 30;
    const paddingLeft = Math.max(0, radius - (currentPlayer.getX() - startCol)) * 30;

    const handleButtonPress = () => {
        console.log('MapGrid.tsx: Button Pressed');
        reportButtonClicked();
    }

    return (
        <div key={gridKey} className={style.root} style={{ paddingTop, paddingLeft }}>
            {grid.slice(startRow, endRow + 1).map((row, rowIndex) => (
                <div key={rowIndex} className={style.row}>
                    {row.slice(startCol, endCol + 1).map((cell, colIndex) => {
                        // Calculate the actual row and column index in the grid
                        const actualRow = startRow + rowIndex;
                        const actualCol = startCol + colIndex;

                        // Check if any other player is at this position
                        const otherPlayer = otherPlayers.find(player => player.getX() === actualCol && player.getY() === actualRow);

                        let cellContent = cell;
                        if (otherPlayer) {

                            const playerImage = otherPlayerImages[otherPlayer.getSessionId()];
                            return (
                                <span key={colIndex} style={{
                                    backgroundImage: `url(${playerImage})`,
                                    backgroundSize: 'cover',
                                    width: '30px',
                                    height: '30px'
                                }}>
                            </span>
                            );
                        } else if (actualRow === currentPlayer.getY() && actualCol === currentPlayer.getX()) {
                            cellContent = (
                                <span key={colIndex} style={{
                                    backgroundImage: `url(${playerImage})`,
                                    backgroundSize: 'cover',
                                    width: '30px',
                                    height: '30px'
                                }}>
                            </span>
                            );
                        }

                        return (
                            <span key={colIndex} className={style.cell}>
                            {cellContent}
                        </span>
                        );
                    })}
                </div>
            ))}
            <div>
                <div>
                    <button className="w-10 h-10" onClick={handleButtonPress}><img alt="reportButton"
                               className="w-10 h-10 hover:bg-black"
                               src={votingboxButton}></img>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapGrid;
