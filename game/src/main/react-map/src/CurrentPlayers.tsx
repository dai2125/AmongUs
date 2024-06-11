import React, {useEffect, useRef, useState} from 'react';
import WebSocketService from './WebSocketService';
import MapGrid from './MapGrid/MapGrid';
import KeyInput from './KeyInputs';
import {Player} from './Player';
import Chatbox from "./GameComponents/Chatbox";
import Timer from "./Screens/Timer";
import Role from "./Screens/Role";
import ThereIsAImpostorAmongUs from "./Screens/ThereIsAImpostorAmongUs";
import Shhhhh from "./Screens/Shhhhh";
import RoleImpostor from "./Screens/RoleImpostor";
import TaskBar from "./GameComponents/TaskBar";
import TaskList from "./GameComponents/TaskList";
import {GridService} from "./MapGrid/GridService";
import KillCrewMate from "./Screens/KillCrewMate";
import Lobby from "./MapGrid/Lobby";
import CrewmateWins from "./Screens/VictoryImpostor";
import VictoryCrewmate from "./Screens/VictoryCrewmate";
import VictoryImpostor from "./Screens/VictoryImpostor";
import DefeatImpostor from "./Screens/DefeatImpostor";
import DefeatCrewmate from "./Screens/DefeatCrewmate";
import Votingbox from "./GameComponents/Votingbox";
import YouKilledACrewmate from "./YouKilledACrewmate";
import VotingActive from "./GameComponents/VotingActive";

import GuessTheNumberMiniGame from './Minigame/GuessTheNumber/GuessTheNumberMiniGame';
import DownloadMiniGame from './Minigame/DownloadMiniGame/DownloadMiniGame';
import ClickInOrderMiniGame from './Minigame/ClickInOrder/ClickInOrderMiniGame';
import NumpadInputCodeMiniGame from './Minigame/NumpadInputCode/NumpadInputCodeMiniGame';
import MemoryMiniGame from './Minigame/Memory/MemoryMiniGame';
import Modal from './Minigame/Modal/Modal';

import purple from "./Images/Character_Movement/Purple.png";
import red from "./Images/Character_Movement/red.jpg";
import gray from "./Images/Characters/Gray.jpg";
import blue from "./Images/Character_Movement/Blue.jpg";
import green from "./Images/Character_Movement/Green.jpg";
import orange from "./Images/Character_Movement/Orange.jpg";
import yellow from "./Images/Character_Movement/Yellow.png";
import black from "./Images/Character_Movement/Black.jpg";
import white from "./Images/Character_Movement/White.jpg";
import brown from "./Images/Character_Movement/Brown.jpg";
import cyan from "./Images/Character_Movement/Cyan.jpg";
import lime from "./Images/Character_Movement/Lime.jpg";
import pink from "./Images/Character_Movement/Pink.jpg";
import dead from "./Images/Character_Movement/dead.png";

import webSocketService from "./WebSocketService";
import Ejected from "./Screens/Ejected";
import OtherPlayerEjected from "./Screens/OtherPlayerEjected";
import NoOneGotEjected from "./Screens/NoOneGotEjected";

interface Props {
    userColor: string;
    userName: string;
    gameId: string;
    onQuit: () => void;
}

const colorToImageUrl = {
    purple: purple,
    red: red,
    gray: gray,
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


const CurrentPlayers: React.FC<Props> = ({onQuit, userColor, userName, gameId}) => {

    const [playerImage, setPlayerImage] = useState(colorToImageUrl[userColor]);
    // const [mapVisible, setMapVisible] = useState(false);
    const [showVotingbox, setShowVotingbox] = useState(false);
    const [tasks, setTasks] = useState({task1: '', task2: '', task3: ''});
    const [showKillCrewMate, setShowKillCrewMate] = useState(false);
    const [showKillImpostor, setShowKillImpostor] = useState(false);
    const [crewmateDead, setCrewmateDead] = useState(false);
    const [showRole, setShowRole] = useState(false);
    const [showShhhhh, setShowShhhhh] = useState(false);
    const [showTaskBar, setShowTaskBar] = useState(true);
    const [chatVisible, setChatVisible] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
    const [showRoleImpostor, setShowRoleImpostor] = useState(false);
    const [showThereIsAImpostorAmoungUs, setShowThereIsAImpostorAmoungUs] = useState(false);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [showLobby, setShowLobby] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [victoryImpostor, setVictoryImpostor] = useState(false);
    const [defeatImpostor, setDefeatImpostor] = useState(false);
    const [victoryCrewmate, setVictoryCrewmate] = useState(false);
    const [defeatCrewmate, setDefeatCrewmate] = useState(false);
    const [showTaskList, setShowTaskList] = useState(false);
    const [youGotKilled, setYouGotKilled] = useState(false);
    const [showYouKilledACrewmate, setShowYouKilledACrewmate] = useState(false);
    // const [reportButtonPressed, setReportButtonPressed] = useState(false);
    const [showEjected, setShowEjected] = useState(false);
    const [showOtherPlayerEjected, setShowOtherPlayerEjected] = useState(false);
    const [ejectedPlayer, setEjectedPlayer] = useState('');
    const [showNoOneGotEjected, setNoOneGotEjected] = useState(false);
    const [deadPlayer, setDeadPlayer] = useState('');
    const [showVotingActive, setShowVotingActive] = useState(false);

    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const playerRef = useRef<Player>(new Player(userName, '', '', gameId, '', 2, 2, '', '', '', ''));

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMiniGame, setCurrentMiniGame] = useState<React.ReactNode>(null);



    useEffect(() => {

        playerRef.current.setX(getRandom(12, 7));
        playerRef.current.setY(getRandom(15, 10));
        console.log('XXXXX: ' + playerRef.current.getX() + ' ' + playerRef.current.getY());
    }, []);


    useEffect(() => {
        playerRef.current.setColor(userColor);
    }, [userColor]);


    // const toggleChat = () => {
    //     if(!chatVisible) {
    //         setChatVisible(true);
    //     } else {
    //         setChatVisible(false);
    //     }
    // };


    const handleStartTimer = () => {
        if (!timerStarted) {
            setTimerStarted(true);
        }
    }

    const onStart = () => {
        setShowLobby(false);
        setTimerStarted(false);
        setShowShhhhh(true);
    }

    const handleShhhhh = () => {
        setShowShhhhh(false);
        setShowThereIsAImpostorAmoungUs(true);
    }

    const handleThereIsAImpostorAmongUs = () => {
        setShowThereIsAImpostorAmoungUs(false);
        if (playerRef.current.getRole() === "impostor") {
            setShowRoleImpostor(true);
        } else {
            setShowRole(true);
        }
    }

    const handleRole = () => {
        setShowRole(false);
        setShowRoleImpostor(false);
        setShowTaskBar(true);
        setShowMap(true);
    }

    useEffect(() => {
        webSocketServiceRef.current = new WebSocketService(playerRef,
            setOtherPlayers,
            handleStartTimer,
            setTasks,
            setCrewmateDead,
            updateTasks,
            dead,
            impostorWinsTheGame,
            crewmateWinsTheGame,
            playerInstance,
            kill,
            votingActive,
            votingNotActive,
            ejectMe,
            someoneGotEjected,
            noOneGotEjected)
        webSocketServiceRef.current.connect();
        return () => {
        };
    }, []);

    const handleKeyPress = (key: string) => {
        if (key === 'w') {
            taskAction();
        } else if (key === 'e' && playerRef.current.getRole() === 'impostor') {
            taskKill(key);
        } else if (webSocketServiceRef.current) {
            const {current: webSocketService} = webSocketServiceRef;
            // TODO for testing
            // webSocketService.sendMovement(key);

        }
    };


    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    //Test Games
    const openMiniGame = (minigame: React.ReactNode) => {
        setCurrentMiniGame(minigame);
        setIsModalVisible(true);
    };

    const closeMiniGame = () => {
        setIsModalVisible(false);
        setCurrentMiniGame(null);
    };

    const handleMiniGameCompletion = () => {
        closeMiniGame();
        const xPosTask = GridService.getXPosTask(playerRef.current.getX(), playerRef.current.getY());
        const yPosTask = GridService.getYPosTask(playerRef.current.getX(), playerRef.current.getY());
        if(xPosTask === 1 && yPosTask === 4) {
            webSocketServiceRef.current.sendTaskResolved("task1", 1, 4);
        } else if(xPosTask === 7 && yPosTask === 1) {
            webSocketServiceRef.current.sendTaskResolved("task2", 7, 1);
        } else if(xPosTask === 9 && yPosTask === 7) {
            webSocketServiceRef.current.sendTaskResolved("task3", 9, 7);
        } else if(xPosTask === 23 && yPosTask === 21) {
            webSocketServiceRef.current.sendTaskResolved("task4", 23, 21);
        } else if(xPosTask === 22 && yPosTask === 6) {
            webSocketServiceRef.current.sendTaskResolved("task5", 22, 6);
        }
    };

    const taskAction = () => {
        if(GridService.isTask(playerRef.current.getY(), playerRef.current.getX())) {
            const xPosTask = GridService.getXPosTask(playerRef.current.getX(), playerRef.current.getY());
            const yPosTask = GridService.getYPosTask(playerRef.current.getX(), playerRef.current.getY());
            if(xPosTask != null && yPosTask != null) {
                if(xPosTask === 1 && yPosTask === 4) {
                    openMiniGame(<GuessTheNumberMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if(xPosTask === 7 && yPosTask === 1) {
                    openMiniGame(<DownloadMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if(xPosTask === 9 && yPosTask === 7) {
                    openMiniGame(<ClickInOrderMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if(xPosTask === 23 && yPosTask === 21) {
                    openMiniGame(<NumpadInputCodeMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if(xPosTask === 22 && yPosTask === 6) {
                    openMiniGame(<MemoryMiniGame onCompletion={handleMiniGameCompletion} />);
                }
            }
        }
    }

    const taskKill = (key: string) => {
        //webSocketServiceRef.current.sendKill(key);

    }

    const updateTasks = () => {
        if (completedTasksCount < 9) {
            setCompletedTasksCount(prevCount => prevCount + 1);
        }
    }

    const dead = () => {
        playerRef.current.setColor("dead");
        setShowKillCrewMate(true);

        // TODO should close automatically, counter is set in the KillCrewMate.tsx but doesnt work
        setTimeout(() => {
            setShowKillCrewMate(false);
        }, 3000);
    }

    const impostorWinsTheGame = () => {
        setShowMap(false);
        if (playerRef.current.getRole() === "impostor") {
            setVictoryImpostor(true);
        } else {
            setDefeatCrewmate(true);
        }
        setTimeout(() => {
            onQuit();
        }, 3000);
    }

    const crewmateWinsTheGame = () => {
        setShowMap(false);
        setShowVotingbox(false);
        if (playerRef.current.getRole() === "crewmate") {
            setVictoryCrewmate(true);
        } else {
            setDefeatImpostor(true);
        }
        setTimeout(() => {
            onQuit();
        }, 3000);
    }

    const playerInstance = () => {
        setTasks({
            task1: playerRef.current.getTask1(),
            task2: playerRef.current.getTask2(),
            task3: playerRef.current.getTask3()
        });

        setTimeout(() => {
            setShowTaskList(true);
        }, 3000);
        // setShowTaskList(true);
    }

    const kill = () => {
        // setShowMap(false);
        // TODO killCrewmate Screen stucks and doesnt end
         setShowYouKilledACrewmate(true);

         setTimeout(() => {
             //setShowKillCrewMate(false);
             setShowYouKilledACrewmate(false);
         }, 1500);
    }

    // const handleButtonPress = () => {
    //     webSocketServiceRef.current.yourAGhostNow();
    // }

    const reportButtonClicked = () => {
        // TODO button wurde in der Map gedrückt
        console.log("CurrentPlayer.tsx: Report Button clicked");
        webSocketServiceRef.current.sendReportButtonPressed();
        // setShowVotingbox(true);
    }

    const handleButtonPress = (votedFor: string) => {
        // TODO button wurde in der VotingBox gedrückt
        console.log('CurrentPlayers.tsx: Votingbox submit button pressed ' + votedFor);
        webSocketServiceRef.current.sendVotingButtonPressed(votedFor);
        // setShowVotingbox(false);
    }

    function getRandom(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    const votingActive = (deadPlayer) => {
        if(playerRef.current.getColor() === 'dead') {
            setShowVotingActive(true);
        } else {
            setDeadPlayer(deadPlayer);
            setShowVotingbox(true);
        }
    }

    const votingNotActive = () => {
        if(playerRef.current.getColor() === 'dead') {
            setShowVotingActive(false);
        } else {
            setShowVotingbox(false);
        }
    }

    const ejectMe = () => {
        // TODO show eject screen

        setShowMap(false);
        setShowEjected(true);

        setTimeout(() => {
            onQuit();
        }, 3000);
    }

    const someoneGotEjected = (ejectedPlayer) => {
        setEjectedPlayer(ejectedPlayer);
        setShowMap(false);
        setShowOtherPlayerEjected(true);

        setTimeout(() => {
            setShowOtherPlayerEjected(false);
            setShowMap(true);
        }, 3000);
    }

    const noOneGotEjected = () => {
        setShowMap(false);
        setNoOneGotEjected(true);

        setTimeout(() => {
            setNoOneGotEjected(false);
            setShowMap(true);
        }, 3000);
    }


    return (
        <div>
            <div className="background">
                <div className="grid grid-rows-10 h-screen w-screen  ">
                    <div className="row-span-1 ">
                        <div
                            className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2">
                            <div id="user-div"
                                 className="col-span-1" style={{
                                backgroundImage: `url(${playerImage})`
                            }
                            }/>
                            {/*<button onClick={toggleChat} className="text-white bg-gray-700 hover:bg-gray-800 font-bold py-2 px-4 rounded m-10">*/}
                            {/*    Press me*/}
                            {/*</button>*/}

                            {/*<button className="w-10 h-10" onClick={toggleChat}><img alt="chatButton"*/}
                            {/*                                                        className="w-10 b-10 "*/}
                            {/*                                                        src={chatButton}></img></button>*/}

                            {/* Chat-Fenster, das nur sichtbar ist, wenn chatVisible true ist */}

                            {/*{chatVisible ?*/}
                            {/*    <Chatbox/> : <div></div>*/}
                            {/*}*/}
                            {/*<div className={chatVisible ? "" : "hidden"}>*/}
                            {/*    <Chatbox/>*/}
                            {/*</div>*/}
                            <Chatbox playerColor={playerRef.current.getColor()}
                                     playerName={playerRef.current.getUserName()}></Chatbox>

                            {showVotingbox ?
                            <Votingbox onButtonPress={handleButtonPress} currentPlayer={playerRef.current}
                                       otherPlayers={otherPlayers} deadPlayer={deadPlayer} ></Votingbox> : <div></div>
                            }
                            { showVotingActive ? <VotingActive></VotingActive> : <div></div> }
                        </div>
                    </div>
                    {/*<div >{purple}</div>*/}
                    <div className="grid grid-cols-12 row-span-1">
                        <div className="col-span-8 border-solid rounded-lg w-1/2 justify-self-">
                            {showTaskBar ?
                                // <TaskBar  /> : <div></div>
                                <TaskBar completedTasksCount={completedTasksCount}/> : <div></div>
                            }
                        </div>
                        <div className="col-span-4 border-solid rounded-lg justify-self-end mr-2 mt-o">
                            <button onClick={onQuit}
                                className="bg-gray-700 hover:bg-gray-800 rounded-lg py-3 px-8">Quit</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-8 gap-5 h-5/6">
                        <div className="col-span-11 border-solid rounded-lg flex justify-center items-center">
                            {showMap ? <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/> :
                                <div></div>}
                        </div>
                        <div>
                            {showTaskList ?
                                <TaskList tasks={tasks}/> : <div></div>
                            }
                        </div>
                        <div className="col-span-8 border-solid rounded-lg flex justify-center items-center">
                            {showLobby ? <Lobby currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/> :

                                <div></div>}
                        </div>
                        <div>
                            <Modal isVisible={isModalVisible} onClose={closeMiniGame}>
                                {currentMiniGame}
                            </Modal>
                        </div>
                     
           /////appearence-work

                      
        //////////////////
                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            {showMap ? <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []} reportButtonClicked={reportButtonClicked}/> :
                                <div></div>}
                        </div>
        ////////////////////
                        {/*<div>*/}
                        {/*    <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">*/}
                        {/*        { showMap ? <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/> :*/}
                        {/*            <div></div> }*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {showPopup && (
                            <div id="popup"
                                 className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-8 rounded-lg">
                                    {/* Your input fields or content for settings popup */}
                                    <label className="text-white">Number of players:</label><br/>
                                    <input type="number" max="15"
                                           className="input-field w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           placeholder="Number of players" required/>

                                    <label className="text-white">Number of imposters:</label><br/>
                                    <input type="number" max="5"
                                           className="input-field w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           placeholder="Number of imposters" required/>

                                    <button onClick={togglePopup}
                                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        {/*<div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">*/}
                        {/*    <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">*/}
                        {/*        <button onClick={togglePopup}*/}
                        {/*                className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Map*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            onClick={onQuit}*/}
                        {/*            className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Quit*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}>
                            {timerStarted ? <Timer onStart={onStart}/> : <div></div>}
                        </div>
                        <div>
                            {showShhhhh ? <Shhhhh onStart={handleShhhhh}/> : <div></div>}
                        </div>
                        <div>
                            {showThereIsAImpostorAmoungUs ?
                                <ThereIsAImpostorAmongUs onStart={handleThereIsAImpostorAmongUs}/> : <div></div>}
                        </div>
                        <div>
                            {showRole ? <Role onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showRoleImpostor ? <RoleImpostor onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showKillCrewMate ? <KillCrewMate onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {/*{ showKillImpostor ? <KillImpostor onStart={handleRole}/> : <div></div> }*/}
                        </div>
                        <div>
                            {victoryImpostor ? <VictoryImpostor onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {victoryCrewmate ? <VictoryCrewmate onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {defeatImpostor ? <DefeatImpostor onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {defeatCrewmate ? <DefeatCrewmate onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showYouKilledACrewmate ? <YouKilledACrewmate onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showEjected ? <Ejected onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showOtherPlayerEjected ?
                                <OtherPlayerEjected ejectedPlayer={ejectedPlayer} onStart={handleRole}/> : <div></div>}
                        </div>
                        <div>
                            {showNoOneGotEjected ?
                                <NoOneGotEjected onStart={handleRole}/> : <div></div>}
                        </div>
                        {/*<div>*/}
                        {/*    {youGotKilled ? <YouGotKilled onStart={handleRole}/> : <div></div>}*/}
                        {/*</div>*/}
                    </div>
                    <KeyInput onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </div>
    );


};


export default CurrentPlayers;
