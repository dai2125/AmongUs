import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import style from "../CSS/MapGridStyle.module.css";
import lime from "../Images/Character_Movement/Lime.jpg";
import dead from "../Images/Character_Movement/dead.png";
import ghost from "../Images/Character_Movement/Ghost.jpg";

import redImageRight from '../Images/Character_Red_Movement/Red_East_Rigth.png';
import redImageRight2 from '../Images/Character_Red_Movement/Red_East_Left.png';
import redImageLeft from '../Images/Character_Red_Movement/Red_West_Left.png';
import redImageLeft2 from '../Images/Character_Red_Movement/Red_West_Right.png';
import redImageUp from '../Images/Character_Red_Movement/Red_North_Stand.png';
import redImageUp2 from '../Images/Character_Red_Movement/Red_North_Right.png';
import redImageDown from '../Images/Character_Red_Movement/Red_South_Left.png';
import redImageDown2 from '../Images/Character_Red_Movement/Red_South_Right.png';

import blueImageRight from '../Images/Character_Blue_Movement/Blue_East_Right.png';
import blueImageRight2 from '../Images/Character_Blue_Movement/Blue_East_Left.png';
import blueImageLeft from '../Images/Character_Blue_Movement/Blue_West_Left.png';
import blueImageLeft2 from '../Images/Character_Blue_Movement/Blue_West_Right.png';
import blueImageUp from '../Images/Character_Blue_Movement/Blue_North_Left.png';
import blueImageUp2 from '../Images/Character_Blue_Movement/Blue_North_Right.png';
import blueImageDown from '../Images/Character_Blue_Movement/Blue_South_Left.png';
import blueImageDown2 from '../Images/Character_Blue_Movement/Blue_South_Right.png';

import cyanImageRight from '../Images/Character_Cyan_Movement/Cyan_East_Right.png';
import cyanImageRight2 from '../Images/Character_Cyan_Movement/Cyan_East_Left.png';
import cyanImageLeft from '../Images/Character_Cyan_Movement/Cyan_West_Left.png';
import cyanImageLeft2 from '../Images/Character_Cyan_Movement/Cyan_West_Right.png';
import cyanImageUp from '../Images/Character_Cyan_Movement/Cyan_North_Left.png';
import cyanImageUp2 from '../Images/Character_Cyan_Movement/Cyan_North_Right.png';
import cyanImageDown from '../Images/Character_Cyan_Movement/Cyan_South_Left.png';
import cyanImageDown2 from '../Images/Character_Cyan_Movement/Cyan_South_Right.png';

import yellowImageRight from '../Images/Character_Yellow_Movement/Yellow_East_Right.png';
import yellowImageRight2 from '../Images/Character_Yellow_Movement/Yellow_East_Left.png';
import yellowImageLeft from '../Images/Character_Yellow_Movement/Yellow_West_Left.png';
import yellowImageLeft2 from '../Images/Character_Yellow_Movement/Yellow_West_Right.png';
import yellowImageUp from '../Images/Character_Yellow_Movement/Yellow_North_Left.png';
import yellowImageUp2 from '../Images/Character_Yellow_Movement/Yellow_North_Right.png';
import yellowImageDown from '../Images/Character_Yellow_Movement/Yellow_South_Left.png';
import yellowImageDown2 from '../Images/Character_Yellow_Movement/Yellow_South_Right.png';

import purpleImageRight from '../Images/Character_Purple_Movement/Purple_East_Right.png';
import purpleImageRight2 from '../Images/Character_Purple_Movement/Purple_East_Left.png';
import purpleImageLeft from '../Images/Character_Purple_Movement/Purple_West_Left.png';
import purpleImageLeft2 from '../Images/Character_Purple_Movement/Purple_West_Right.png';
import purpleImageUp from '../Images/Character_Purple_Movement/Purple_North_Left.png';
import purpleImageUp2 from '../Images/Character_Purple_Movement/Purple_North_Right.png';
import purpleImageDown from '../Images/Character_Purple_Movement/Purple_South_Left.png';
import purpleImageDown2 from '../Images/Character_Purple_Movement/Purple_South_Right.png';

import limeImageRight from '../Images/Character_Lime_Movement/Lime_East_Right.png';
import limeImageRight2 from '../Images/Character_Lime_Movement/Lime_East_Left.png';
import limeImageLeft from '../Images/Character_Lime_Movement/Lime_West_Left.png';
import limeImageLeft2 from '../Images/Character_Lime_Movement/Lime_West_Right.png';
import limeImageUp from '../Images/Character_Lime_Movement/Lime_North_Left.png';
import limeImageUp2 from '../Images/Character_Lime_Movement/Lime_North_Right.png';
import limeImageDown from '../Images/Character_Lime_Movement/Lime_South_Left.png';
import limeImageDown2 from '../Images/Character_Lime_Movement/Lime_South_Right.png';

import greenImageRight from '../Images/Character_Green_Movement/Green_East_Right.png';
import greenImageRight2 from '../Images/Character_Green_Movement/Green_East_Left.png';
import greenImageLeft from '../Images/Character_Green_Movement/Green_West_Left.png';
import greenImageLeft2 from '../Images/Character_Green_Movement/Green_West_Right.png';
import greenImageUp from '../Images/Character_Green_Movement/Green_North_Left.png';
import greenImageUp2 from '../Images/Character_Green_Movement/Green_North_Right.png';
import greenImageDown from '../Images/Character_Green_Movement/Green_South_Left.png';
import greenImageDown2 from '../Images/Character_Green_Movement/Green_South_Right.png';

import pinkImageRight from '../Images/Character_Pink_Movement/Pink_East_Right.png';
import pinkImageRight2 from '../Images/Character_Pink_Movement/Pink_East_Left.png';
import pinkImageLeft from '../Images/Character_Pink_Movement/Pink_West_Left.png';
import pinkImageLeft2 from '../Images/Character_Pink_Movement/Pink_West_Right.png';
import pinkImageUp from '../Images/Character_Pink_Movement/Pink_North_Left.png';
import pinkImageUp2 from '../Images/Character_Pink_Movement/Pink_North_Right.png';
import pinkImageDown from '../Images/Character_Pink_Movement/Pink_South_Left.png';
import pinkImageDown2 from '../Images/Character_Pink_Movement/Pink_South_Right.png';

import orangeImageRight from '../Images/Character_Orange_Movement/Orange_East_Right.png';
import orangeImageRight2 from '../Images/Character_Orange_Movement/Orange_East_Left.png';
import orangeImageLeft from '../Images/Character_Orange_Movement/Orange_West_Left.png';
import orangeImageLeft2 from '../Images/Character_Orange_Movement/Orange_West_Right.png';
import orangeImageUp from '../Images/Character_Orange_Movement/Orange_North_Left.png';
import orangeImageUp2 from '../Images/Character_Orange_Movement/Orange_North_Right.png';
import orangeImageDown from '../Images/Character_Orange_Movement/Orange_South_Left.png';
import orangeImageDown2 from '../Images/Character_Orange_Movement/Orange_South_Right.png';

import whiteImageRight from '../Images/Character_White_Movement/White_East_Right.png';
import whiteImageRight2 from '../Images/Character_White_Movement/White_East_Left.png';
import whiteImageLeft from '../Images/Character_White_Movement/White_West_Left.png';
import whiteImageLeft2 from '../Images/Character_White_Movement/White_West_Right.png';
import whiteImageUp from '../Images/Character_White_Movement/White_North_Left.png';
import whiteImageUp2 from '../Images/Character_White_Movement/White_North_Right.png';
import whiteImageDown from '../Images/Character_White_Movement/White_South_Left.png';
import whiteImageDown2 from '../Images/Character_White_Movement/White_South_Right.png';

import blackImageRight from '../Images/Character_Black_Movement/Black_East_Right.png';
import blackImageRight2 from '../Images/Character_Black_Movement/Black_East_Left.png';
import blackImageLeft from '../Images/Character_Black_Movement/Black_West_Left.png';
import blackImageLeft2 from '../Images/Character_Black_Movement/Black_West_Right.png';
import blackImageUp from '../Images/Character_Black_Movement/Black_North_Left.png';
import blackImageUp2 from '../Images/Character_Black_Movement/Black_North_Right.png';
import blackImageDown from '../Images/Character_Black_Movement/Black_South_Left.png';
import blackImageDown2 from '../Images/Character_Black_Movement/Black_South_Right.png';

import brownImageRight from '../Images/Character_Brown_Movement/Brown_East_Right.png';
import brownImageRight2 from '../Images/Character_Brown_Movement/Brown_East_Left.png';
import brownImageLeft from '../Images/Character_Brown_Movement/Brown_West_Left.png';
import brownImageLeft2 from '../Images/Character_Brown_Movement/Brown_West_Right.png';
import brownImageUp from '../Images/Character_Brown_Movement/Brown_North_Left.png';
//import brownImageUp2 from '../Images/Character_Brown_Movement/Brown_North_Right.png';
import brownImageDown from '../Images/Character_Brown_Movement/Brown_South_Left.png';
import brownImageDown2 from '../Images/Character_Brown_Movement/Brown_South_Right.png';

import ghostImageRight from '../Images/Character_Ghost_Movement/Ghost_East.png';
import ghostImageLeft from '../Images/Character_Ghost_Movement/Ghost_West.png';

import Votingbox from "../GameComponents/Votingbox";
import votingboxButton from '../Images/Votingbox/report_player.png';

import SockJS from "sockjs-client";
import Stomp, {client} from "stompjs";

import skeldImage from '../Images/Maps/Skeld.png';
import '../CSS/MapGrid.css';
import {Player} from "../Player";
import {send} from "vite";


interface MapGridProps {
    currentPlayer: Player;
    otherPlayers: any[];
    reportButtonClicked: () => void;
}

const colorToImageUrl = {
    purple: purpleImageDown,
    red: redImageDown,
    blue: blueImageDown,
    green: greenImageDown,
    orange: orangeImageDown,
    yellow: yellowImageDown,
    black: blackImageDown,
    white: whiteImageDown,
    brown: brownImageDown,
    cyan: cyanImageDown,
    lime: limeImageDown,
    pink: pinkImageDown,
    dead: dead,
    ghost: ghost
};

const MapGrid: React.FC<MapGridProps> = ({currentPlayer, otherPlayers, reportButtonClicked}) => {

    const [otherPlayer, setOtherPlayer] = useState(otherPlayers);
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[currentPlayer.getColor()]);
    const [otherPlayerImages, setOtherPlayerImages] = useState({});
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollPosition, setScrollPosition] = useState({x: 0, y: 0});
    const [gridKey, setGridKey] = useState(0);
    const containerRef = useRef(null);
    const [playerDirection, setPlayerDirection] = useState('');
    const [showReportButton, setShowReportButton] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: currentPlayer.getX(), y: currentPlayer.getY() });
    const [otherPlayerDirection, setOtherPlayerDirection] = useState({});
    const [otherPlayerPosition, setOtherPlayerPosition] = useState({});
    const [deadPlayer, setDeadPlayer] = useState('');
    const [yourDead, setYourDead] = useState(false);
    const [yourTheImpostor, setYourTheImpostor] = useState(currentPlayer.getRole() === 'impostor');
    const [killActive, setKillActive] = useState(true);
    const [killCooldown, setKillCooldown] = useState(0);
    const [ventActive, setVentActive] = useState(true);
    const [ventCooldown, setVentCooldown] = useState(0);
    const [lastMove, setLastMove] = useState(Date.now());

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

    const [loadedImage, setLoadedImage] = useState(null);

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
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghostImageRight;
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
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghostImageRight;
                }  else {
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
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghostImageLeft;
                }  else {
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
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghostImageLeft;
                } else {
                    imageSrc = redImageLeft2;
                }
                break;
            case 'up':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageUp2;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageUp2;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageUp2;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageUp2;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageUp2;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageUp2;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageUp2;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageUp2;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageUp2;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageUp2;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageUp2;
                } else if(currentPlayer.getColor() === 'brown') {
                    //imageSrc = brownImageUp2;
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghost;
                } else {
                    imageSrc = redImageUp2;
                }
                break;
            case 'up2':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageUp;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageUp;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageUp;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageUp;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageUp;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageUp;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageUp;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageUp;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageUp;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageUp;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageUp;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageUp;
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghost;
                } else {
                    imageSrc = redImageUp;
                }
                break;
            case 'down':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageDown;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageDown;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageDown;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageDown;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageDown;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageDown;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageDown;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageDown;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageDown;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageDown;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageDown;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageDown;
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghost;
                } else {
                    imageSrc = redImageDown;
                }
                break;
            case 'down2':
                if(currentPlayer.getColor() === 'red') {
                    imageSrc = redImageDown2;
                } else if(currentPlayer.getColor() === 'blue') {
                    imageSrc = blueImageDown2;
                } else if(currentPlayer.getColor() === 'cyan') {
                    imageSrc = cyanImageDown2;
                } else if(currentPlayer.getColor() === 'yellow') {
                    imageSrc = yellowImageDown2;
                } else if(currentPlayer.getColor() === 'purple') {
                    imageSrc = purpleImageDown2;
                } else if(currentPlayer.getColor() === 'lime') {
                    imageSrc = limeImageDown2;
                } else if(currentPlayer.getColor() === 'green') {
                    imageSrc = greenImageDown;
                } else if(currentPlayer.getColor() === 'pink') {
                    imageSrc = pinkImageDown2;
                } else if(currentPlayer.getColor() === 'orange') {
                    imageSrc = orangeImageDown2;
                } else if(currentPlayer.getColor() === 'white') {
                    imageSrc = whiteImageDown2;
                } else if(currentPlayer.getColor() === 'black') {
                    imageSrc = blackImageDown2;
                } else if(currentPlayer.getColor() === 'brown') {
                    imageSrc = brownImageDown2;
                } else if(currentPlayer.getColor() === 'dead') {
                    imageSrc = dead;
                } else if(currentPlayer.getColor() === 'ghost') {
                    imageSrc = ghost;
                } else {
                    imageSrc = redImageDown;
                }
                break;
            default:
                imageSrc = redImageRight;
        }

        setPlayerImage(imageSrc);
    }, [playerDirection]);

    // useEffect(() => {
    //     let imageSrc;
    //     switch (otherPlayerDirection) {
    //         case 'right':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageRight;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageRight;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageRight;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageRight;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageRight;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageRight;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageRight;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageRight;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageRight;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageRight;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageRight;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageRight;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghostImageRight;
    //             } else {
    //                 imageSrc = redImageRight;
    //             }
    //             break;
    //         case 'right2':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageRight2;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageRight2;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageRight2;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageRight2;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageRight2;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageRight2;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageRight2;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageRight2;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageRight2;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageRight2;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageRight2;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageRight2;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghostImageRight;
    //             }  else {
    //                 imageSrc = redImageRight2;
    //             }
    //             break;
    //         case 'left':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageLeft;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageLeft;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageLeft;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageLeft;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageLeft;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageLeft;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageLeft;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageLeft;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageLeft;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageLeft;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageLeft;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageLeft;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghostImageLeft;
    //             }  else {
    //                 imageSrc = redImageLeft;
    //             }
    //             break;
    //         case 'left2':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageLeft2;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageLeft2;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageLeft2;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageLeft2;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageLeft2;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageLeft2;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageLeft2;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageLeft2;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageLeft2;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageLeft2;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageLeft2;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageLeft2;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghostImageLeft;
    //             } else {
    //                 imageSrc = redImageLeft2;
    //             }
    //             break;
    //         case 'up':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageUp2;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageUp2;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageUp2;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageUp2;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageUp2;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageUp2;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageUp2;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageUp2;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageUp2;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageUp2;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageUp2;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageUp2;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghost;
    //             } else {
    //                 imageSrc = redImageUp2;
    //             }
    //             break;
    //         case 'up2':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageUp;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageUp;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageUp;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageUp;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageUp;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageUp;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageUp;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageUp;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageUp;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageUp;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageUp;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageUp;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghost;
    //             } else {
    //                 imageSrc = redImageUp;
    //             }
    //             break;
    //         case 'down':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageDown;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageDown;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageDown;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageDown;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageDown;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageDown;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageDown;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageDown;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageDown;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageDown;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageDown;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageDown;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghost;
    //             } else {
    //                 imageSrc = redImageDown;
    //             }
    //             break;
    //         case 'down2':
    //             if(otherPlayer.getColor() === 'red') {
    //                 imageSrc = redImageDown2;
    //             } else if(otherPlayer.getColor() === 'blue') {
    //                 imageSrc = blueImageDown2;
    //             } else if(otherPlayer.getColor() === 'cyan') {
    //                 imageSrc = cyanImageDown2;
    //             } else if(otherPlayer.getColor() === 'yellow') {
    //                 imageSrc = yellowImageDown2;
    //             } else if(otherPlayer.getColor() === 'purple') {
    //                 imageSrc = purpleImageDown2;
    //             } else if(otherPlayer.getColor() === 'lime') {
    //                 imageSrc = limeImageDown2;
    //             } else if(otherPlayer.getColor() === 'green') {
    //                 imageSrc = greenImageDown;
    //             } else if(otherPlayer.getColor() === 'pink') {
    //                 imageSrc = pinkImageDown2;
    //             } else if(otherPlayer.getColor() === 'orange') {
    //                 imageSrc = orangeImageDown2;
    //             } else if(otherPlayer.getColor() === 'white') {
    //                 imageSrc = whiteImageDown2;
    //             } else if(otherPlayer.getColor() === 'black') {
    //                 imageSrc = blackImageDown2;
    //             } else if(otherPlayer.getColor() === 'brown') {
    //                 imageSrc = brownImageDown2;
    //             } else if(otherPlayer.getColor() === 'dead') {
    //                 imageSrc = dead;
    //             } else if(otherPlayer.getColor() === 'ghost') {
    //                 imageSrc = ghost;
    //             } else {
    //                 imageSrc = redImageDown;
    //             }
    //             break;
    //         default:
    //             imageSrc = redImageRight;
    //     }
    //
    //     setPlayerImage(imageSrc);
    // }, [otherPlayerDirection]);

    useEffect(() => {
        const image = new Image();
        image.src = skeldImage;
        image.onload = () => {
            setLoadedImage(image);
        };
    }, [skeldImage]);

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

    // const currentPlayerImage = useMemo(() => {
    //     return playerImages[currentPlayer.getColor()];
    // }, [currentPlayer.getColor()]);


    useEffect(() => {
        setGridKey(prevKey => prevKey + 1);
    }, [currentPlayer, otherPlayers]);

    useEffect(() => {
        otherPlayers.forEach(player => {
            updatePlayerImage(player);
        });
    }, [otherPlayers]);

    // useEffect(() => {
    //     const visibleDeadPlayer = otherPlayers.find(player => {
    //         console.log('isCellVisible: ' + isCellVisible(currentPlayer.getX(), currentPlayer.getY(), player.getX(), player.getY()));
    //         const isVisible = isCellVisible(currentPlayer.getX(), currentPlayer.getY(), player.getX(), player.getY());
    //         return player.getColor() === "dead" && isVisible;
    //     });
    //     setShowReportButton(visibleDeadPlayer !== undefined);
    //
    // }, [otherPlayers, currentPlayer]);





    const updatePlayerImage = (player) => {
        let newImage;
        if (!player.getMovable()) {
            newImage = colorToImageUrl['dead'];
            newImage = lime;
        } else if (player.getColor() === 'dead') {
            newImage = colorToImageUrl['dead'];
            console.log('DEADPLAYER: ' + player);
        } else {
            newImage = colorToImageUrl[player.getColor()];


            // setShowReportButton(false);

        }
        setOtherPlayerImages(prevImages => ({...prevImages, [player.getSessionId()]: newImage}));
    };

    const grid: any[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 3, 3, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 3, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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

    const visibilityRadius = 5;

    function isCellVisible(playerX, playerY, cellX, cellY) {
        const distance = Math.abs(cellX - playerX) + Math.abs(cellY - playerY);
        return distance <= visibilityRadius;
    }

    const handleButtonPress = () => {
        reportButtonClicked();
    }

    const handleKillButtonPress = () => {
        // sendKill();
    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe(`/topic/movement/north/${currentPlayer.getUserName()}`, (message) => {
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

            client.subscribe(`/topic/movement/south/${currentPlayer.getUserName()}`, (message) => {
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

            client.subscribe(`/topic/movement/west/${currentPlayer.getUserName()}`, (message) => {
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

            client.subscribe(`/topic/movement/east/${currentPlayer.getUserName()}`, (message) => {
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

            client.subscribe('/topic/movement/north/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if(response.userName !== currentPlayer.getUserName()) {
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
                }
            });

            client.subscribe('/topic/movement/south/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if(response.userName !== currentPlayer.getUserName()) {
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
                }
            });

            client.subscribe('/topic/movement/west/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if(response.userName !== currentPlayer.getUserName()) {
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
                }
            });

            client.subscribe('/topic/movement/east/otherPlayer/', (message) => {
                const response = JSON.parse(message.body);
                if(response.userName !== currentPlayer.getUserName()) {
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
                }
            });

            client.subscribe(`/topic/airsystem/${currentPlayer.getUserName()}`, (message) => {
                console.log('airsystem message received')
                const response = JSON.parse(message.body);
                currentPlayer.setX(response.x);
                currentPlayer.setY(response.y);
            });

            client.subscribe(`/topic/deadPlayerVisible/${currentPlayer.getUserName()}`, () => {
                setShowReportButton(true);
            });

            client.subscribe(`/topic/deadPlayerNotVisible/${currentPlayer.getUserName()}`, () => {
                setShowReportButton(false);
            });

            if(currentPlayer.getRole() === "impostor") {
                client.subscribe(`/topic/killButtonNotActive/${currentPlayer.getUserName()}`, () => {
                    console.log('kill button not active')

                    setKillActive(false);
                });

                client.subscribe(`/topic/killButtonActive/${currentPlayer.getUserName()}`, () => {
                    console.log('kill button active')

                    setKillActive(true);
                });

                client.subscribe(`/topic/killCooldown/${currentPlayer.getUserName()}`, (message) => {
                    const response = JSON.parse(message.body);
                    setKillCooldown(response);

                    if(response === 0) {

                        setKillActive(true);
                    }
                });

                client.subscribe(`/topic/ventNotActive/${currentPlayer.getUserName()}`, () => {
                    console.log('vent not active')

                    setVentActive(false);
                });

                client.subscribe(`/topic/ventActive/${currentPlayer.getUserName()}`, () => {
                    console.log('vent active')

                    setVentActive(true);
                });

                client.subscribe(`/topic/ventCooldown/${currentPlayer.getUserName()}`, (message) => {
                    const response = JSON.parse(message.body);
                    setVentCooldown(response);
                    if(response === 0) {

                        setVentActive(true);
                    }
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
                default:
                    break;
            }
        };

        function sendMovementNorth() {
            const now = Date.now();
            const delay = 100;

            if (now - lastMove < delay) {
                setLastMove(now);

            }

            console.log("YOUR ROLE: " + currentPlayer.getRole());
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
                client.send(`/app/movement/north/${currentPlayer.getUserName()}`, {}, payload);
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
                client.send(`/app/movement/south/${currentPlayer.getUserName()}`, {}, payload);
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
                client.send(`/app/movement/west/${currentPlayer.getUserName()}`, {}, payload);
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
                client.send(`/app/movement/east/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        function sendKill() {
            console.log('kill e pressed: ' + currentPlayer.getRole());
            if(currentPlayer.getRole() === "crewmate") {
                console.log('you cant kill');
                return;
            }
            console.log("Hello from new kill");
            let payload;
            for (let player of otherPlayers) {
                if ((player.getY() == currentPlayer.getY() && (player.getX() == currentPlayer.getX() + 1 || player.getX() == currentPlayer.getX() - 1)) ||
                    (player.getX() == currentPlayer.getX() && (player.getY() == currentPlayer.getY() + 1 || player.getY() == currentPlayer.getY() - 1))) {
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
            client.send(`/app/kill/${currentPlayer.getUserName()}`, {}, payload);
        }

        function sendAirSystem() {
            console.log('airSystem q pressed');
            if(currentPlayer.getRole() === 'impostor') {
                const payload = JSON.stringify({
                    userName: currentPlayer.getUserName(),
                    action: currentPlayer.getAction(),
                    sessionId: currentPlayer.getSessionId(),
                    color: currentPlayer.getColor(),
                    x: currentPlayer.getX(),
                    y: currentPlayer.getY()
                });
                client.send(`/app/airsystem/${currentPlayer.getUserName()}`, {}, payload);
            }
        }

        const sendReport = (deadPlayer) => {
            if(deadPlayer) {
                const payload = JSON.stringify({
                    reporter: currentPlayer.getUserName(),
                    deadPlayer: deadPlayer,
                });
                client.send(`/app/reportButtonPressed/${currentPlayer.getUserName()}`, {}, payload);
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
            position: 'absolute', width: '120%', height: '100%', top: 200, left: -200, overflow: 'auto',
            overflowX: 'hidden', overflowY: 'hidden'
        }}>
            <canvas ref={canvasRef} id="game" width="2500" height="1800"
                    style={{border: '1px solid black', display: 'block'}}></canvas>
            <div key={gridKey} className={style.root} style={{position: 'absolute', top: 30, left: 175}}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.row}>
                        {row.map((cell, colIndex) => {
                            const otherPlayer = otherPlayers.find(player => player.getX() === colIndex && player.getY() === rowIndex);
                            const cellContent = cell;
                            const isVisible = isCellVisible(currentPlayer.getX(), currentPlayer.getY(), colIndex, rowIndex);
                            const cellStyle = isVisible ? {
                                backgroundSize: 'cover',
                                width: '30px',
                                height: '30px'
                            } : {
                                visibility: 'hidden',
                                // width: '30px',
                                // height: '30px'
                            };

                            if (otherPlayer && isVisible) {
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
                                                  // transform: 'translate(-50%, -50%)'
                                              }}>
                                    </span>
                                );
                            }

                            const blinkClass = cellContent === 2 ? style.blink : '';

                            return (
                                <span key={colIndex} className={`${style.cell} ${blinkClass}`} style={{cellStyle}}>
                                {cellContent}
                            </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div style={{
                position: 'fixed',
                right: 10,
                bottom: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '10px',
                borderRadius: '5px',
            }}>
                { showReportButton ?
                    <div>
                        <button className="w-10 h-10" onClick={handleButtonPress}><img alt="reportButton"
                        className="w-10 h-10 hover:bg-black"
                        src={votingboxButton}></img></button>
                    </div> : <div></div>
                }
                {yourTheImpostor ? <div>
                    {/*<h1>You are the impostor</h1>*/}
                    <h2>Keyboard controls</h2>

                    { killActive ?
                        <div><p>Kill E</p></div> : <div><p>Cooldown {killCooldown}</p></div>
                    }
                    { ventActive ?
                        <div><p>Vent Q</p></div> : <div><p>Cooldown {ventCooldown}</p></div>
                    }

                    <p>Up Arrow up</p>
                    <p>Down Arrow Down</p>
                    <p>Left Arrow Left</p>
                    <p>Right Arrow Right</p>
                </div> :
                <div>
                    {/*<h1>You are a crewmate</h1>*/}
                    <h2>Keyboard controls</h2>
                    <p>Task W</p>
                    <p>Up Arrow up</p>
                    <p>Down Arrow Down</p>
                    <p>Left Arrow Left</p>
                    <p>Right Arrow Right</p>
                </div>
                }

                {/*<p>Sabotage S</p>*/}
            </div>
        </div>
    );
}

export default React.memo(MapGrid);
