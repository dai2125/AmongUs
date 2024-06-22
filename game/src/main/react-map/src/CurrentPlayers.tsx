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
import WaitingRoom from "./MapGrid/WaitingRoom";

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
    const [showLobby, setShowLobby] = useState(false);
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
    const [showTestGrid, setShowTestGrid] = useState(false);
    const [showWaitingRoom, setShowWaitingRoom] = useState(true);

    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const playerRef = useRef<Player>(new Player(userName, '', '', gameId, '', 2, 2, '', '', '', '', true, 'down'));

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMiniGame, setCurrentMiniGame] = useState<React.ReactNode>(null);

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

        // setShowMap(true);
    }

    const onStart = () => {
        setShowWaitingRoom(false);
        setShowLobby(false);
        setTimerStarted(false);
        setShowShhhhh(true);
    }

    const handleShhhhh = () => {
        setShowShhhhh(false);
        setShowThereIsAImpostorAmoungUs(true);
        setShowTaskList(true);
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
        // TODO
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
        if (key === 'w' && playerRef.current.getRole() === "crewmate") {
            taskAction();
        } else if (key === 'e' && playerRef.current.getRole() === "impostor") {
            taskKill(key);
        }
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

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
        if(xPosTask === 11 && yPosTask === 5) {
            webSocketServiceRef.current.sendTaskResolved("Guess the number", 11, 5);
            if(playerRef.current.getTask1() === "Guess the number") {
                playerRef.current.setTask1("");
            } else if(playerRef.current.getTask2() === "Guess the number") {
                playerRef.current.setTask2("");
            } else if(playerRef.current.getTask3() === "Guess the number") {
                playerRef.current.setTask3("");
            }
            playerInstance();
            setShowTaskList(false);
            setShowTaskList(true);
        } else if(xPosTask === 36 && (yPosTask === 4 || yPosTask === 5)) {
            webSocketServiceRef.current.sendTaskResolved("Download the file", 36, 4);
            if(playerRef.current.getTask1() === "Download the file") {
                playerRef.current.setTask1("");
            } else if(playerRef.current.getTask2() === "Download the file") {
                playerRef.current.setTask2("");
            } else if(playerRef.current.getTask3() === "Download the file") {
                playerRef.current.setTask3("");
            }
            playerInstance();
            setShowTaskList(false);
            setShowTaskList(true);
        } else if(xPosTask === 72 && (yPosTask === 17 || yPosTask === 18 || yPosTask === 19)) {
            webSocketServiceRef.current.sendTaskResolved("Enter the number sequence", 72, 17);
            if(playerRef.current.getTask1() === "Enter the number sequence") {
                playerRef.current.setTask1("");
            } else if(playerRef.current.getTask2() === "Enter the number sequence") {
                playerRef.current.setTask2("");
            } else if(playerRef.current.getTask3() === "Enter the number sequence") {
                playerRef.current.setTask3("");
            }
            playerInstance();
            setShowTaskList(false);
            setShowTaskList(true);
        } else if(xPosTask === 51 && (yPosTask === 37 || yPosTask === 38)) {
            webSocketServiceRef.current.sendTaskResolved("Answer the question", 51, 37);
            if(playerRef.current.getTask1() === "Answer the question") {
                playerRef.current.setTask1("");
            } else if(playerRef.current.getTask2() === "Answer the question") {
                playerRef.current.setTask2("");
            } else if(playerRef.current.getTask3() === "Answer the question") {
                playerRef.current.setTask3("");
            }
            playerInstance();
            setShowTaskList(false);
            setShowTaskList(true);
        } else if(yPosTask === 40 && (xPosTask === 40 || xPosTask === 41)) {
            webSocketServiceRef.current.sendTaskResolved("Memory game", 40, 40);
            if(playerRef.current.getTask1() === "Memory game") {
                playerRef.current.setTask1("");
            } else if(playerRef.current.getTask2() === "Memory game") {
                playerRef.current.setTask2("");
            } else if(playerRef.current.getTask3() === "Memory game") {
                playerRef.current.setTask3("");
            }
            playerInstance();
            setShowTaskList(false);
            setShowTaskList(true);
        }
    };

    const taskAction = () => {
        console.log("pressed w")
        if(GridService.isTask(playerRef.current.getY(), playerRef.current.getX())) {
            const xPosTask = GridService.getXPosTask(playerRef.current.getX(), playerRef.current.getY());
            const yPosTask = GridService.getYPosTask(playerRef.current.getX(), playerRef.current.getY());
            console.log("Checking task: " + xPosTask + ", " + yPosTask);
            if(xPosTask != null && yPosTask != null) {
                if((xPosTask === 11 && yPosTask === 5) && (playerRef.current.getTask1() === "Guess the number" || playerRef.current.getTask2() === "Guess the number" || playerRef.current.getTask3() === "Guess the number")) {
                    console.log('openMiniGame: 1')
                    openMiniGame(<GuessTheNumberMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if((xPosTask === 36 && (yPosTask === 4 || yPosTask === 5)) && (playerRef.current.getTask1() === "Download the file" || playerRef.current.getTask2() === "Download the file" || playerRef.current.getTask3() === "Download the file")) {
                    console.log('openMiniGame: 2')

                    openMiniGame(<DownloadMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if((xPosTask === 72 && (yPosTask === 17 || yPosTask === 18 || yPosTask === 19)) && (playerRef.current.getTask1() === "Enter the number sequence" || playerRef.current.getTask2() === "Enter the number sequence" || playerRef.current.getTask3() === "Enter the number sequence")) {
                    console.log('openMiniGame: 3')

                    openMiniGame(<ClickInOrderMiniGame onCompletion={handleMiniGameCompletion} />);
                } else if((xPosTask === 51 && (yPosTask === 37 || yPosTask === 38)) && (playerRef.current.getTask1() === "Answer the question" || playerRef.current.getTask2() === "Answer the question" || playerRef.current.getTask3() === "Answer the question")) {
                    console.log('openMiniGame: 4')

                    openMiniGame(<NumpadInputCodeMiniGame onCompletion={handleMiniGameCompletion} />);
                    console.log("NumpadInputCodeMiniGame")
                } else if((yPosTask === 40 && (xPosTask === 40 || xPosTask === 41)) && (playerRef.current.getTask1() === "Memory game" || playerRef.current.getTask2() === "Memory game" || playerRef.current.getTask3() === "Memory game")) {
                    console.log('openMiniGame: 5')

                    openMiniGame(<MemoryMiniGame onCompletion={handleMiniGameCompletion} />);
                }
            }
        }
    }

    const updateTasks = () => {
        if (completedTasksCount < 9) {
            setCompletedTasksCount(prevCount => prevCount + 1);
        }
    }

    const dead = () => {
        playerRef.current.setColor('dead');
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
    }

    const kill = () => {
         setShowYouKilledACrewmate(true);

         setTimeout(() => {
             setShowYouKilledACrewmate(false);
         }, 1500);
    }

    const reportButtonClicked = () => {
        console.log("CurrentPlayer.tsx: Report Button clicked");
        webSocketServiceRef.current.sendReportButtonPressed();
    }

    const handleButtonPress = (votedFor: string) => {
        console.log('CurrentPlayers.tsx: Votingbox submit button pressed ' + votedFor);
        webSocketServiceRef.current.sendVotingButtonPressed(votedFor);
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
                            }}/>
                            <Chatbox playerColor={playerRef.current.getColor()}
                                     playerName={playerRef.current.getUserName()}></Chatbox>

                            {showVotingbox ?
                            <Votingbox onButtonPress={handleButtonPress} currentPlayer={playerRef.current}
                                       otherPlayers={otherPlayers} deadPlayer={deadPlayer} ></Votingbox> : <div></div>
                            }
                            { showVotingActive ? <VotingActive></VotingActive> : <div></div> }
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-1">
                        <div className="col-span-8 border-solid rounded-lg w-1/2 justify-self-">
                            {showTaskBar ?
                                <TaskBar completedTasksCount={completedTasksCount}/> : <div></div>
                            }
                        </div>
                        <div className="col-span-4 border-solid rounded-lg justify-self-end mr-2 mt-o">
                            <button onClick={onQuit}
                                className="bg-gray-700 hover:bg-gray-800 rounded-lg py-3 px-8">Quit</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-8 gap-5 h-5/6">
                        <div>
                            {showTaskList ?
                                <TaskList role={playerRef.current.getRole()} tasks={tasks}/> : <div></div>
                            }
                        </div>
                        <div className="col-span-8 border-solid rounded-lg flex justify-center items-center">
                            {showWaitingRoom ? <WaitingRoom /> : <div></div>}
                        </div>
                        <div>
                            <Modal isVisible={isModalVisible} onClose={closeMiniGame}>
                                {currentMiniGame}
                            </Modal>
                        </div>

                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            {showMap ? <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}
                                                reportButtonClicked={reportButtonClicked}/> : <div></div>}
                        </div>

                        {showPopup && (
                            <div id="popup"
                                 className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-8 rounded-lg">
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
                    </div>
                    <KeyInput onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </div>
    );
};

export default CurrentPlayers;
