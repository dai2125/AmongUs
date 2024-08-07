import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import style from "../CSS/MapGridStyle.module.css";
import dead from "../Images/Character_Movement/dead.png";

import redImageEast from '../Images/Character_Red_Movement/Red_East_Right.png';
import redImageEast2 from '../Images/Character_Red_Movement/Red_East_Left.png';
import redImageWest from '../Images/Character_Red_Movement/Red_West_Left.png';
import redImageWest2 from '../Images/Character_Red_Movement/Red_West_Right.png';
import redImageNorth from '../Images/Character_Red_Movement/Red_North_Stand.png';
import redImageNorth2 from '../Images/Character_Red_Movement/Red_North_Right.png';
import redImageSouth from '../Images/Character_Red_Movement/Red_South_Left.png';
import redImageSouth2 from '../Images/Character_Red_Movement/Red_South_Right.png';

import blueImageEast from '../Images/Character_Blue_Movement/Blue_East_Right.png';
import blueImageEast2 from '../Images/Character_Blue_Movement/Blue_East_Left.png';
import blueImageWest from '../Images/Character_Blue_Movement/Blue_West_Left.png';
import blueImageWest2 from '../Images/Character_Blue_Movement/Blue_West_Right.png';
import blueImageNorth from '../Images/Character_Blue_Movement/Blue_North_Left.png';
import blueImageNorth2 from '../Images/Character_Blue_Movement/Blue_North_Right.png';
import blueImageSouth from '../Images/Character_Blue_Movement/Blue_South_Left.png';
import blueImageSouth2 from '../Images/Character_Blue_Movement/Blue_South_Right.png';

import cyanImageEast from '../Images/Character_Cyan_Movement/Cyan_East_Right.png';
import cyanImageEast2 from '../Images/Character_Cyan_Movement/Cyan_East_Left.png';
import cyanImageWest from '../Images/Character_Cyan_Movement/Cyan_West_Left.png';
import cyanImageWest2 from '../Images/Character_Cyan_Movement/Cyan_West_Right.png';
import cyanImageNorth from '../Images/Character_Cyan_Movement/Cyan_North_Left.png';
import cyanImageNorth2 from '../Images/Character_Cyan_Movement/Cyan_North_Right.png';
import cyanImageSouth from '../Images/Character_Cyan_Movement/Cyan_South_Left.png';
import cyanImageSouth2 from '../Images/Character_Cyan_Movement/Cyan_South_Right.png';

import yellowImageEast from '../Images/Character_Yellow_Movement/Yellow_East_Right.png';
import yellowImageEast2 from '../Images/Character_Yellow_Movement/Yellow_East_Left.png';
import yellowImageWest from '../Images/Character_Yellow_Movement/Yellow_West_Left.png';
import yellowImageWest2 from '../Images/Character_Yellow_Movement/Yellow_West_Right.png';
import yellowImageNorth from '../Images/Character_Yellow_Movement/Yellow_North_Left.png';
import yellowImageNorth2 from '../Images/Character_Yellow_Movement/Yellow_North_Right.png';
import yellowImageSouth from '../Images/Character_Yellow_Movement/Yellow_South_Left.png';
import yellowImageSouth2 from '../Images/Character_Yellow_Movement/Yellow_South_Right.png';

import purpleImageEast from '../Images/Character_Purple_Movement/Purple_East_Right.png';
import purpleImageEast2 from '../Images/Character_Purple_Movement/Purple_East_Left.png';
import purpleImageWest from '../Images/Character_Purple_Movement/Purple_West_Left.png';
import purpleImageWest2 from '../Images/Character_Purple_Movement/Purple_West_Right.png';
import purpleImageNorth from '../Images/Character_Purple_Movement/Purple_North_Left.png';
import purpleImageNorth2 from '../Images/Character_Purple_Movement/Purple_North_Right.png';
import purpleImageSouth from '../Images/Character_Purple_Movement/Purple_South_Left.png';
import purpleImageSouth2 from '../Images/Character_Purple_Movement/Purple_South_Right.png';

import limeImageEast from '../Images/Character_Lime_Movement/Lime_East_Right.png';
import limeImageEast2 from '../Images/Character_Lime_Movement/Lime_East_Left.png';
import limeImageWest from '../Images/Character_Lime_Movement/Lime_West_Left.png';
import limeImageWest2 from '../Images/Character_Lime_Movement/Lime_West_Right.png';
import limeImageNorth from '../Images/Character_Lime_Movement/Lime_North_Left.png';
import limeImageNorth2 from '../Images/Character_Lime_Movement/Lime_North_Right.png';
import limeImageSouth from '../Images/Character_Lime_Movement/Lime_South_Left.png';
import limeImageSouth2 from '../Images/Character_Lime_Movement/Lime_South_Right.png';

import greenImageEast from '../Images/Character_Green_Movement/Green_East_Right.png';
import greenImageEast2 from '../Images/Character_Green_Movement/Green_East_Left.png';
import greenImageWest from '../Images/Character_Green_Movement/Green_West_Left.png';
import greenImageWest2 from '../Images/Character_Green_Movement/Green_West_Right.png';
import greenImageNorth from '../Images/Character_Green_Movement/Green_North_Left.png';
import greenImageNorth2 from '../Images/Character_Green_Movement/Green_North_Right.png';
import greenImageSouth from '../Images/Character_Green_Movement/Green_South_Left.png';
import greenImageSouth2 from '../Images/Character_Green_Movement/Green_South_Right.png';

import pinkImageEast from '../Images/Character_Pink_Movement/Pink_East_Right.png';
import pinkImageEast2 from '../Images/Character_Pink_Movement/Pink_East_Left.png';
import pinkImageWest from '../Images/Character_Pink_Movement/Pink_West_Left.png';
import pinkImageWest2 from '../Images/Character_Pink_Movement/Pink_West_Right.png';
import pinkImageNorth from '../Images/Character_Pink_Movement/Pink_North_Left.png';
import pinkImageNorth2 from '../Images/Character_Pink_Movement/Pink_North_Right.png';
import pinkImageSouth from '../Images/Character_Pink_Movement/Pink_South_Left.png';
import pinkImageSouth2 from '../Images/Character_Pink_Movement/Pink_South_Right.png';

import orangeImageEast from '../Images/Character_Orange_Movement/Orange_East_Right.png';
import orangeImageEast2 from '../Images/Character_Orange_Movement/Orange_East_Left.png';
import orangeImageWest from '../Images/Character_Orange_Movement/Orange_West_Left.png';
import orangeImageWest2 from '../Images/Character_Orange_Movement/Orange_West_Right.png';
import orangeImageNorth from '../Images/Character_Orange_Movement/Orange_North_Left.png';
import orangeImageNorth2 from '../Images/Character_Orange_Movement/Orange_North_Right.png';
import orangeImageSouth from '../Images/Character_Orange_Movement/Orange_South_Left.png';
import orangeImageSouth2 from '../Images/Character_Orange_Movement/Orange_South_Right.png';

import whiteImageEast from '../Images/Character_White_Movement/White_East_Right.png';
import whiteImageEast2 from '../Images/Character_White_Movement/White_East_Left.png';
import whiteImageWest from '../Images/Character_White_Movement/White_West_Left.png';
import whiteImageWest2 from '../Images/Character_White_Movement/White_West_Right.png';
import whiteImageNorth from '../Images/Character_White_Movement/White_North_Left.png';
import whiteImageNorth2 from '../Images/Character_White_Movement/White_North_Right.png';
import whiteImageSouth from '../Images/Character_White_Movement/White_South_Left.png';
import whiteImageSouth2 from '../Images/Character_White_Movement/White_South_Right.png';

import blackImageEast from '../Images/Character_Black_Movement/Black_East_Right.png';
import blackImageEast2 from '../Images/Character_Black_Movement/Black_East_Left.png';
import blackImageWest from '../Images/Character_Black_Movement/Black_West_Left.png';
import blackImageWest2 from '../Images/Character_Black_Movement/Black_West_Right.png';
import blackImageNorth from '../Images/Character_Black_Movement/Black_North_Left.png';
import blackImageNorth2 from '../Images/Character_Black_Movement/Black_North_Right.png';
import blackImageSouth from '../Images/Character_Black_Movement/Black_South_Left.png';
import blackImageSouth2 from '../Images/Character_Black_Movement/Black_South_Right.png';

import brownImageEast from '../Images/Character_Brown_Movement/Brown_East_Right.png';
import brownImageEast2 from '../Images/Character_Brown_Movement/Brown_East_Left.png';
import brownImageWest from '../Images/Character_Brown_Movement/Brown_West_Left.png';
import brownImageWest2 from '../Images/Character_Brown_Movement/Brown_West_Right.png';
import brownImageNorth from '../Images/Character_Brown_Movement/Brown_North_Left.png';
import brownImageNorth2 from '../Images/Character_Brown_Movement/Brown_North_Left.png';
import brownImageSouth from '../Images/Character_Brown_Movement/Brown_South_Left.png';
import brownImageSouth2 from '../Images/Character_Brown_Movement/Brown_South_Right.png';

import ghostImageEast from '../Images/Character_Ghost_Movement/Ghost_East.png';
import ghostImageWest from '../Images/Character_Ghost_Movement/Ghost_West.png';
import ghostImageSouth from '../Images/Character_Ghost_Movement/Ghost_South.png';
import ghostImageNorth from '../Images/Character_Ghost_Movement/Ghost_North.png';

import votingboxButton from '../Images/Votingbox/report_player.png';

import AlarmScreen from '../Screens/AlarmScreen';
import AirSystemScreen from '../Screens/AirSystem';

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import skeldImage from '../Images/Maps/Skeld.png';
import '../CSS/MapGrid.css';
import {Player} from "../Player";

interface MapGridProps {
    currentPlayer: Player;
    otherPlayers: any[];
    reportButtonClicked: () => void;
    onKeyClick: () => void;
}

const colorToImageUrl = {
    purpleImageSouth: purpleImageSouth,
    purpleNorth: purpleImageNorth,
    purpleEast: purpleImageEast,
    purpleWest: purpleImageWest,
    red: redImageSouth,
    blue: blueImageSouth,
    green: greenImageSouth,
    orange: orangeImageSouth,
    yellow: yellowImageSouth,
    black: blackImageSouth,
    white: whiteImageSouth,
    brown: brownImageSouth,
    cyan: cyanImageSouth,
    lime: limeImageSouth,
    pinkImageSouth: pinkImageSouth,
    pinkImageNorth: pinkImageNorth,
    pinkImageEast: pinkImageEast,
    pinkImageWest: pinkImageWest,
    dead: dead,
    ghost: ghostImageSouth
};

const movementQueue = [];

const MapGrid: React.FC<MapGridProps> = ({
                                             currentPlayer, otherPlayers, reportButtonClicked, onKeyClick
                                         }) => {


    const [otherPlayer, setOtherPlayer] = useState(otherPlayers);
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[currentPlayer.getColor()]);
    const [otherPlayerImages, setOtherPlayerImages] = useState({});
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollPosition, setScrollPosition] = useState({x: 0, y: 0});
    const [gridKey, setGridKey] = useState(0);
    const containerRef = useRef(null);
    const [playerDirection, setPlayerDirection] = useState('south');
    const [showReportButton, setShowReportButton] = useState(true);
    const [playerPosition, setPlayerPosition] = useState({x: currentPlayer.getX(), y: currentPlayer.getY()});
    const [yourTheImpostor, setYourTheImpostor] = useState(currentPlayer.getRole() === 'impostor');
    const [killActive, setKillActive] = useState(true);
    const [killCooldown, setKillCooldown] = useState(0);
    const [ventActive, setVentActive] = useState(true);
    const [notConnected, setNotConnected] = useState(false);
    const [sabotageActive, setSabotageActive] = useState(false);
    const [alarm, setAlarm] = useState(false);
    const [sabotageCountdown, setSabotageCountdown] = useState(300);
    const [showAlarmScreen, setShowAlarmScreen] = useState(false);
    const [showAirSystem, setShowAirSystem] = useState(false);

    setInterval(() => {
        if (movementQueue.length > 0) {
            const response = movementQueue.shift();

            setPlayerPosition({x: response.x, y: response.y});
            if (response.direction === 'north') {
                if (currentPlayer.getY() % 2 === 0) {
                    currentPlayer.setY(response.y);
                    setPlayerDirection('north');
                } else {
                    currentPlayer.setY(response.y);
                    setPlayerDirection('north2');
                }
            } else if (response.direction === 'south') {
                if (currentPlayer.getY() % 2 === 0) {
                    currentPlayer.setY(response.y);
                    setPlayerDirection('south');
                } else {
                    currentPlayer.setY(response.y);
                    setPlayerDirection('south2');
                }
            } else if (response.direction === 'east') {
                if (currentPlayer.getX() % 2 === 0) {
                    currentPlayer.setX(response.x);
                    setPlayerDirection('east');
                } else {
                    currentPlayer.setX(response.x);
                    setPlayerDirection('east2');
                }
            } else if (response.direction === 'west') {
                if (currentPlayer.getX() % 2 === 0) {
                    currentPlayer.setX(response.x);
                    setPlayerDirection('west');
                } else {
                    currentPlayer.setX(response.x);
                    setPlayerDirection('west2');
                }
            }
            currentPlayer.setDirection(response.direction);
        }
    }, 100);

    useEffect(() => {
        const updateScrollPosition = () => {
            if (containerRef.current && canvasRef.current) {
                const playerX = currentPlayer.getX() * 30;
                const playerY = currentPlayer.getY() * 30;
                const centerX = containerRef.current.offsetWidth / 2;
                const centerY = containerRef.current.offsetHeight / 2;

                containerRef.current.scrollLeft = playerX - centerX;
                containerRef.current.scrollTop = playerY - centerY;
            }
        };
        updateScrollPosition();
    }, [currentPlayer.getX(), currentPlayer.getY()]);

    const [loadedImage, setLoadedImage] = useState(null);

    const playerMap = {
        red: {
            east: redImageEast,
            east2: redImageEast2,
            west: redImageWest,
            west2: redImageWest2,
            north: redImageNorth,
            north2: redImageNorth2,
            south: redImageSouth,
            south2: redImageSouth2
        },
        blue: {
            east: blueImageEast,
            east2: blueImageEast2,
            west: blueImageWest,
            west2: blueImageWest2,
            north: blueImageNorth,
            north2: blueImageNorth2,
            south: blueImageSouth,
            south2: blueImageSouth2
        },
        cyan: {
            east: cyanImageEast,
            east2: cyanImageEast2,
            west: cyanImageWest,
            west2: cyanImageWest2,
            north: cyanImageNorth,
            north2: cyanImageNorth2,
            south: cyanImageSouth,
            south2: cyanImageSouth2
        },
        yellow: {
            east: yellowImageEast,
            east2: yellowImageEast2,
            west: yellowImageWest,
            west2: yellowImageWest2,
            north: yellowImageNorth,
            north2: yellowImageNorth2,
            south: yellowImageSouth,
            south2: yellowImageSouth2
        },
        purple: {
            east: purpleImageEast,
            east2: purpleImageEast2,
            west: purpleImageWest,
            west2: purpleImageWest2,
            north: purpleImageNorth,
            north2: purpleImageNorth2,
            south: purpleImageSouth,
            south2: purpleImageSouth2
        },
        lime: {
            east: limeImageEast,
            east2: limeImageEast2,
            west: limeImageWest,
            west2: limeImageWest2,
            north: limeImageNorth,
            north2: limeImageNorth2,
            south: limeImageSouth,
            south2: limeImageSouth2
        },
        green: {
            east: greenImageEast,
            east2: greenImageEast2,
            west: greenImageWest,
            west2: greenImageWest2,
            north: greenImageNorth,
            north2: greenImageNorth2,
            south: greenImageSouth,
            south2: greenImageSouth2
        },
        pink: {
            east: pinkImageEast,
            east2: pinkImageEast2,
            west: pinkImageWest,
            west2: pinkImageWest2,
            north: pinkImageNorth,
            north2: pinkImageNorth2,
            south: pinkImageSouth,
            south2: pinkImageSouth2
        },
        orange: {
            east: orangeImageEast,
            east2: orangeImageEast2,
            west: orangeImageWest,
            west2: orangeImageWest2,
            north: orangeImageNorth,
            north2: orangeImageNorth2,
            south: orangeImageSouth,
            south2: orangeImageSouth2
        },
        white: {
            east: whiteImageEast,
            east2: whiteImageEast2,
            west: whiteImageWest,
            west2: whiteImageWest2,
            north: whiteImageNorth,
            north2: whiteImageNorth2,
            south: whiteImageSouth,
            south2: whiteImageSouth2
        },
        black: {
            east: blackImageEast,
            east2: blackImageEast2,
            west: blackImageWest,
            west2: blackImageWest2,
            north: blackImageNorth,
            north2: blackImageNorth2,
            south: blackImageSouth,
            south2: blackImageSouth2
        },
        brown: {
            east: brownImageEast,
            east2: brownImageEast2,
            west: brownImageWest,
            west2: brownImageWest2,
            north: brownImageNorth,
            north2: brownImageNorth2,
            south: brownImageSouth,
            south2: brownImageSouth2
        },
        ghost: {
            north: ghostImageNorth,
            north2: ghostImageNorth,
            south: ghostImageSouth,
            south2: ghostImageSouth,
            west: ghostImageWest,
            west2: ghostImageWest,
            east: ghostImageEast,
            east2: ghostImageEast
        },
        dead: dead
    };

    useEffect(() => {
        const color = currentPlayer.getColor();
        const imageSrc = playerMap[color]?.[playerDirection] || redImageSouth;
        setPlayerImage(imageSrc);
    }, [playerDirection]);

    useEffect(() => {
        const image = new Image();
        image.src = skeldImage;
        image.onload = () => {
            setLoadedImage(image);
        };
    }, [skeldImage]);

    useEffect(() => {
        setPlayerImage(colorToImageUrl[currentPlayer.getColor()]);
    }, [currentPlayer.getColor()]);

    useEffect(() => {
        setGridKey(prevKey => prevKey + 1);
    }, [currentPlayer, otherPlayers]);

    useEffect(() => {
        otherPlayers.forEach(player => {
            updatePlayerImage(player);
        });
    }, [otherPlayers]);

    useEffect(() => {
    }, [setAlarm, setKillActive]);

    function updatePlayerImage(player) {
        let newImage;
        if (player.getColor() === 'dead') {
            newImage = colorToImageUrl['dead'];
        } else {
            if (player.getColor() === "pink") {
                if (player.getDirection() === "north") {
                    newImage = pinkImageNorth;
                } else if (player.getDirection() === "south") {
                    newImage = pinkImageSouth;
                } else if (player.getDirection() === "east") {
                    newImage = pinkImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = pinkImageWest;
                }
            } else if (player.getColor() === "red") {
                if (player.getDirection() === "south") {
                    newImage = redImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = redImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = redImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = redImageWest;
                }
            } else if (player.getColor() === "blue") {
                if (player.getDirection() === "south") {
                    newImage = blueImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = blueImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = blueImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = blueImageWest;
                }
            } else if (player.getColor() === "green") {
                if (player.getDirection() === "south") {
                    newImage = greenImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = greenImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = greenImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = greenImageWest;
                }
            } else if (player.getColor() === "orange") {
                if (player.getDirection() === "south") {
                    newImage = orangeImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = orangeImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = orangeImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = orangeImageWest;
                }
            } else if (player.getColor() === "yellow") {
                if (player.getDirection() === "south") {
                    newImage = yellowImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = yellowImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = yellowImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = yellowImageWest;
                }
            } else if (player.getColor() === "black") {
                if (player.getDirection() === "south") {
                    newImage = blackImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = blackImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = blackImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = blackImageWest;
                }
            } else if (player.getColor() === "white") {
                if (player.getDirection() === "south") {
                    newImage = whiteImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = whiteImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = whiteImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = whiteImageWest;
                }
            } else if (player.getColor() === "brown") {
                if (player.getDirection() === "south") {
                    newImage = brownImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = brownImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = brownImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = brownImageWest;
                }
            } else if (player.getColor() === "cyan") {
                if (player.getDirection() === "south") {
                    newImage = cyanImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = cyanImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = cyanImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = cyanImageWest;
                }
            } else if (player.getColor() === "lime") {
                if (player.getDirection() === "south") {
                    newImage = limeImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = limeImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = limeImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = limeImageWest;
                }
            } else if (player.getColor() === "purple") {
                if (player.getDirection() === "south") {
                    newImage = purpleImageSouth;
                } else if (player.getDirection() === "north") {
                    newImage = purpleImageNorth;
                } else if (player.getDirection() === "east") {
                    newImage = purpleImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = purpleImageWest;
                }
            } else if (player.getColor() === "ghost") {
                if (player.getDirection() === "north") {
                    newImage = ghostImageNorth;
                } else if (player.getDirection() === "south") {
                    newImage = ghostImageSouth;
                } else if (player.getDirection() === "east") {
                    newImage = ghostImageEast;
                } else if (player.getDirection() === "west") {
                    newImage = ghostImageWest;
                }
            }
        }
        setOtherPlayerImages(prevImages => ({...prevImages, [player.getSessionId()]: newImage}));
    }

    const grid: any[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 2, 2, 1, 1, 0, 0, 1],
        [1, 0, 0, 3, 3, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 4, 4, 4, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4, 4, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 3, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 2, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 4, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    ];

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            const image = new Image();
            image.src = skeldImage;

            image.onload = () => {
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                const scaleFactor = 2;
                context.scale(scaleFactor, scaleFactor);

                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
            };
        }
    }, [currentPlayer, skeldImage]);

    const visibilityRadius = 10;

    function isCellVisible(playerX, playerY, cellX, cellY) {
        const distance = Math.abs(cellX - playerX) + Math.abs(cellY - playerY);
        return distance <= visibilityRadius;
    }

    const handleButtonPress = () => {
        reportButtonClicked();
        setShowReportButton(false);
    }

    const handleKill = () => {
        setKillActive(false);
    }

    const handleSabotageAndKill = () => {
        setSabotageActive(true);
        setKillActive(true);
    };

    if (!notConnected) {
        setNotConnected(true);
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe(`/topic/movement/north/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                movementQueue.push(response);
            });

            client.subscribe(`/topic/movement/south/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                movementQueue.push(response);
            });

            client.subscribe(`/topic/movement/west/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                movementQueue.push(response);
            });

            client.subscribe(`/topic/movement/east/${currentPlayer.getUserName()}`, (message) => {
                const response = JSON.parse(message.body);
                movementQueue.push(response);
            });

            client.subscribe('/topic/movement/north/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if (response.userName !== currentPlayer.getUserName()) {
                    setOtherPlayer((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {

                            if (p.getSessionId() === response.sessionId) {
                                p.setX(response.x);
                                p.setY(response.y);
                                p.setDirection(response.direction);
                                p.setColor(response.color);
                                updatePlayerImage(p);
                            }
                            return p;
                        });
                        return updatedPlayers;
                    })
                }
            });

            client.subscribe('/topic/movement/south/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if (response.userName !== currentPlayer.getUserName()) {
                    setOtherPlayer((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {
                            if (p.getSessionId() === response.sessionId) {
                                p.setX(response.x);
                                p.setY(response.y);
                                p.setDirection(response.direction);
                                p.setColor(response.color);
                                updatePlayerImage(p);
                            }
                            return p;
                        });
                        return updatedPlayers;
                    })
                }
            });

            client.subscribe('/topic/movement/west/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if (response.userName !== currentPlayer.getUserName()) {
                    setOtherPlayer((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {
                            if (p.getSessionId() === response.sessionId) {
                                p.setX(response.x);
                                p.setY(response.y);
                                p.setDirection(response.direction);
                                p.setColor(response.color);

                                updatePlayerImage(p);
                            }
                            return p;
                        });
                        return updatedPlayers;
                    })
                }
            });

            client.subscribe('/topic/movement/east/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if (response.userName !== currentPlayer.getUserName()) {
                    setOtherPlayer((prevOtherPlayers) => {
                        const updatedPlayers = prevOtherPlayers.map((p) => {
                            if (p.getSessionId() === response.sessionId) {
                                p.setX(response.x);
                                p.setY(response.y);
                                p.setDirection(response.direction);
                                p.setColor(response.color);
                                updatePlayerImage(p);
                            }
                            return p;
                        });
                        return updatedPlayers;
                    })
                }
            });

            client.subscribe(`/topic/airsystem/${currentPlayer.getUserName()}`, (message) => {
                setShowAirSystem(true);

                setTimeout(() => {
                    setShowAirSystem(false);
                }, 10000);

                const response = JSON.parse(message.body);
                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
            });

            client.subscribe(`/topic/deadPlayerVisible/${currentPlayer.getUserName()}`, () => {
            });

            client.subscribe('/topic/setShowReportButtonTrue/', () => {
                setShowReportButton(true);
            });

            client.subscribe('/topic/setShowReportButtonFalse/', () => {
                setShowReportButton(false);
            });

            client.subscribe(`/topic/deadPlayerNotVisible/${currentPlayer.getUserName()}`, () => {
            });

            client.subscribe('/topic/sabotageActive/', () => {
                setAlarm(true);

                if (currentPlayer.getRole() === 'Impostor') {
                    currentPlayer.setTask2('SabotageNotActive');
                }

                setShowAlarmScreen(true);

                currentPlayer.setAction('SabotageActive');
                setKillActive(false);
                setSabotageActive(true);
            });

            client.subscribe('/topic/sabotageNotActive/', () => {
                setAlarm(false);
                currentPlayer.setAction('SabotageNotActive');
            });

            client.subscribe('/topic/sabotageButtonActive/', () => {
                handleSabotageAndKill();
            });

            client.subscribe(`/topic/dead/${currentPlayer.getUserName()}`, () => {
                currentPlayer.setMovable(false);
                currentPlayer.setColor('dead');

                setShowReportButton(false);
                client.unsubscribe('topic/setShowReportButtonTrue/');
                client.unsubscribe('topic/setShowReportButtonFalse/');

                playerImage.src = dead;
                updatePlayerImage(currentPlayer);
            });

            if (currentPlayer.getRole() === "impostor") {
                client.subscribe(`/topic/killButtonNotActive/${currentPlayer.getUserName()}`, () => {
                    handleKill();
                    currentPlayer.setAction('KillNotActive');
                    setKillActive(false);
                });

                client.subscribe('/topic/killButtonActive/', () => {
                    currentPlayer.setAction('KillActive');

                    setKillActive(true);
                });

                client.subscribe(`/topic/killCooldown/${currentPlayer.getUserName()}`, (message) => {
                    const response = JSON.parse(message.body);
                    setKillCooldown(response);

                    if (response === 0) {
                        setKillActive(true);
                    }
                });

                client.subscribe(`/topic/ventNotActive/${currentPlayer.getUserName()}`, () => {
                    setVentActive(false);
                    setTimeout(() => {
                        setVentActive(true);
                    }, 10000);
                });

                client.subscribe(`/topic/airSystemActive/${currentPlayer.getUserName()}`, () => {
                    setVentActive(true);
                });

                client.subscribe(`/topic/airSystemCountdown/${currentPlayer.getUserName()}`, (message) => {
                    const response = JSON.parse(message.body);
                    if (response === 0) {
                        setVentActive(true);
                    }
                });

                client.subscribe(`/topic/sabotage/${currentPlayer.getUserName()}`, () => {
                });

                client.subscribe(`/topic/setSabotageFalse/${currentPlayer.getUserName()}`, () => {
                    setSabotageActive(false);
                });

                client.subscribe(`/topic/setSabotageTrue/${currentPlayer.getUserName()}`, () => {
                    setSabotageActive(true);
                });

                client.subscribe('/topic/sabotageButtonCountdown/', (message) => {
                    const response = JSON.parse(message.body);
                    setSabotageCountdown(response);
                    if (response === 0) {
                        setSabotageActive(true);
                    }
                });
            }

            if (currentPlayer.getColor() === 'ghost') {

                client.unsubscribe(`/topic/movementNorth/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movementSouth/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movementWest/${currentPlayer.getUserName()}`);
                client.unsubscribe(`/topic/movementEast/${currentPlayer.getUserName()}`);

                client.subscribe(`/topic/ghostMovementNorth/${currentPlayer.getUserName()}`, () => {
                });

                client.subscribe(`/topic/ghostMovementSouth/${currentPlayer.getUserName()}`, () => {

                });

                client.subscribe(`/topic/ghostMovementWest/${currentPlayer.getUserName()}`, () => {

                });

                client.subscribe(`/topic/ghostMovementEast/${currentPlayer.getUserName()}`, () => {

                });
            }
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
                case 'q':
                    sendAirSystem();
                    break;
                case 'e':
                    sendKill();
                    break;
                case 'w':
                    onKeyClick();
                    break;
                case 'f':
                    sendSabotage();
                    break;
                case 'r':
                    sendImSafe();
                    break;
                case 't':
                    reportButtonClicked();
                    break;
                default:
                    break;
            }
        };

        const sendMovementNorth = () => {
            if (!currentPlayer.getMovable()) {
                return;
            } else {
                currentPlayer.setDirection("north");
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    direction: currentPlayer.getDirection()
                });
                client.send(`/app/movement/north/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendMovementSouth = () => {
            if (!currentPlayer.getMovable()) {
                return;
            } else {
                currentPlayer.setDirection("south");
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    direction: currentPlayer.getDirection()
                });
                client.send(`/app/movement/south/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendMovementWest = () => {
            if (!currentPlayer.getMovable()) {
                return;
            } else {
                currentPlayer.setDirection("west");
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    direction: currentPlayer.getDirection()
                });
                client.send(`/app/movement/west/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendMovementEast = () => {
            if (!currentPlayer.getMovable()) {
                return;
            } else {
                currentPlayer.setDirection("east");
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    direction: currentPlayer.getDirection()
                });
                client.send(`/app/movement/east/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendKill = () => {

            if (currentPlayer.getRole() === "crewmate" || alarm || sabotageActive) {
                return;
            }

            if (currentPlayer.getAction() === 'SabotageActive' || currentPlayer.getAction() === 'KillNotActive') {
                return;
            }

            let payload = null;
            for (let player of otherPlayers) {
                if (((player.getY() == currentPlayer.getY() && (player.getX() == currentPlayer.getX() + 1 || player.getX() == currentPlayer.getX() - 1)) ||
                    (player.getX() == currentPlayer.getX() && (player.getY() == currentPlayer.getY() + 1 || player.getY() == currentPlayer.getY() - 1)) ||
                    (player.getY() == currentPlayer.getY() && (player.getX() == currentPlayer.getX() + 2 || player.getX() == currentPlayer.getX() - 2)) ||
                    (player.getX() == currentPlayer.getX() && (player.getY() == currentPlayer.getY() + 2 || player.getY() == currentPlayer.getY() - 2)))
                     && player.getMovable()) {
                    player.setMovable(false);
                    console.log("Hello from new kill inside ", currentPlayer.getGameId());

                    payload = JSON.stringify({
                        objectOne: currentPlayer.getUserName(),
                        objectTwo: player.getUserName(),
                        positionDeadPlayerX: player.getX(),
                        positionDeadPlayerY: player.getY(),
                        gameId: currentPlayer.getGameId(),
                    });
                    break;
                }
            }
            if (payload){
                client.send(`/app/kill/${currentPlayer.getUserName()}`, {}, payload);
            }

        }

        const sendAirSystem = () => {
            if (currentPlayer.getRole() === 'impostor' && ventActive) {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                setVentActive(false);
                client.send(`/app/airsystem/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendSabotage = () => {
            if (currentPlayer.getRole() === 'impostor' && !sabotageActive) {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    gameId: currentPlayer.getGameId()
                });
                client.send(`/app/sabotage/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendImSafe = () => {
            if (currentPlayer.getAction() === 'SabotageActive') {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY(),
                    gameId: currentPlayer.getGameId()
                });
                client.send(`/app/safetyButtonPressed/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        document.addEventListener('keydown', (event) => {
            handleMove(event.key);
        });
    }

    return (
        <div ref={containerRef} style={{
            position: 'absolute', width: '120%', height: '100%', top: 200, left: -200, overflow: 'auto',
            overflowX: 'hidden', overflowY: 'hidden'
        }}>
            {alarm && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 2500,
                    height: 1800,
                    zIndex: 10,
                }} className="blinkingTransparentRed"></div>
            )}
            <canvas ref={canvasRef} id="game" width="2500" height="1800"
                    style={{border: '1px solid black', display: 'block'}}>

            </canvas>
            <div key={gridKey} className={style.root} style={{position: 'absolute', top: 20, left: 180}}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.row}>
                        {row.map((cell, colIndex) => {
                            const otherPlayer = otherPlayers.find(player => player.getX() === colIndex && player.getY() === rowIndex);
                            const cellContent = cell;
                            const isVisible = isCellVisible(currentPlayer.getX(), currentPlayer.getY(), colIndex, rowIndex);
                            const cellStyle = isVisible ? {
                                backgroundSize: 'cover', width: '30px', height: '30px'
                            } : {};

                            if (otherPlayer && isVisible) {
                                const playerImage = otherPlayerImages[otherPlayer.getSessionId()];
                                return (
                                    <span style={{
                                        backgroundImage: `url(${playerImage})`,
                                        backgroundSize: 'cover',
                                        width: '30px',
                                        height: '30px',
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
                                                  height: '30px',
                                              }}>
                                    </span>
                                );
                            }

                            const blinkClass = cellContent === 2 ? style.blink : '';

                            return (

                                <span key={colIndex} className={`${style.cell} ${blinkClass}`} style={{cellStyle}}>
                                    {/*{cellContent}*/}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div>
                {showAlarmScreen ?
                    <AlarmScreen/> : <div></div>}
            </div>
            <div>
                {showAirSystem ?
                    <AirSystemScreen/> : <div></div>}
            </div>
            <div style={{
                position: 'fixed',
                right: 10,
                bottom: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '10px',
                borderRadius: '5px',
            }}>

                {yourTheImpostor ? (
                    <div>
                        <h2 className="h2">KEYBOARD CONTROLS</h2>
                        <div className="button-container">
                            {showReportButton ?
                                <div>
                                    <button className="w-10 h-10" onClick={handleButtonPress}><img alt="reportButton"
                                                                                                   className="w-10 h-10 hover:bg-black"
                                                                                                   src={votingboxButton}></img>
                                    </button>
                                </div> : <div></div>
                            }
                        </div>
                        <p>Vent Q</p>
                        <p>Kill E</p>
                        <p>Sabotage F</p>
                        <p>End Sabotage R</p>
                        <p>Up Arrow up</p>
                        <p>Right Arrow Right</p>
                        <p>Left Arrow Left</p>
                        <p>Down Arrow Down</p>
                    </div>
                ) : (
                    <div>
                        <h2>KEYBOARD CONTROLS</h2>
                        {showReportButton ?
                            <div>
                                <button className="w-10 h-10" onClick={handleButtonPress}><img alt="reportButton"
                                                                                               className="w-10 h-10 hover:bg-black"
                                                                                               src={votingboxButton}></img>
                                </button>
                            </div> : <div></div>
                        }
                        <p>Task E</p>
                        <p>End Sabotage R</p>
                        <p>Up Arrow up</p>
                        <p>Down Arrow Down</p>
                        <p>Left Arrow Left</p>
                        <p>Right Arrow Right</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(MapGrid);
