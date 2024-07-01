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

import Ejected from "./Screens/Ejected";
import OtherPlayerEjected from "./Screens/OtherPlayerEjected";
import NoOneGotEjected from "./Screens/NoOneGotEjected";
import Lobby from "./MapGrid/Lobby";
import WaitingRoom from "./MapGrid/WaitingRoom";
import TaskProgress from "./GameComponents/TaskProgress";

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
    const [showVotingbox, setShowVotingbox] = useState(false);
    const [tasks, setTasks] = useState({task1: '', task2: '', task3: ''});
    const [showKillCrewMate, setShowKillCrewMate] = useState(false);
    const [crewmateDead, setCrewmateDead] = useState(false);
    const [showRole, setShowRole] = useState(false);
    const [showShhhhh, setShowShhhhh] = useState(false);
    const [showTaskBar, setShowTaskBar] = useState(false);
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
    const [showYouKilledACrewmate, setShowYouKilledACrewmate] = useState(false);
    // const [reportButtonPressed, setReportButtonPressed] = useState(false);
    const [showEjected, setShowEjected] = useState(false);
    const [showOtherPlayerEjected, setShowOtherPlayerEjected] = useState(false);
    const [ejectedPlayer, setEjectedPlayer] = useState('');
    const [showNoOneGotEjected, setNoOneGotEjected] = useState(false);
    const [deadPlayer, setDeadPlayer] = useState('');
    const [showVotingActive, setShowVotingActive] = useState(false);
    const [showWaitingRoom, setShowWaitingRoom] = useState(true);
    const [sabotageActive, setSabotageActive] = useState(false);
    const [showChatbox, setShowChatbox] = useState(true);

    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const taskProgress = useRef<number>(0);

    const playerRef = useRef<Player>(new Player(userName, '', '', gameId, '', 2, 2, '', '', '', '', true, 'south'));

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMiniGame, setCurrentMiniGame] = useState<React.ReactNode>(null);

    const [lastCompletedGuessTheNumber, setLastCompletedGuessTheNumber] = useState<number | null>(null);
    const [lastCompletedDownloadFile, setLastCompletedDownloadFile] = useState<number | null>(null);
    const [lastCompletedEnterNumberSequence, setLastCompletedEnterNumberSequence] = useState<number | null>(null);
    const [lastCompletedAnswerQuestion, setLastCompletedAnswerQuestion] = useState<number | null>(null);
    const [lastCompletedMemoryGame, setLastCompletedMemoryGame] = useState<number | null>(null);


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
        // setShowTaskList(true);
    }

    const handleThereIsAImpostorAmongUs = () => {
        setShowThereIsAImpostorAmoungUs(false);
        if (playerRef.current.getRole() === "impostor") {
            setShowRoleImpostor(true);
        } else {
            setShowRole(true);
            setShowMapButton(true);
        }
    }

    const handleRole = () => {
        setShowRole(false);
        setShowRoleImpostor(false);
        setShowTaskBar(true);
        setShowTaskList(true);
        setShowChatbox(false);
        setShowMap(true);
        setChatVisible(false);
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
            noOneGotEjected,
            setCompletedTasksCount,
            taskProgress)
        webSocketServiceRef.current.connect();
        return () => {
        };
    }, []);

    const updateTasks = () => {

        console.log("IN TASK RESOLVED", taskProgress.current)
        if (completedTasksCount < 100) {
            setCompletedTasksCount(prevCount => prevCount + taskProgress.current );
        }
    }

    const handleKeyPress = (key: string) => {

        if (key === 'w' && playerRef.current.getRole() === "crewmate") {
            taskAction();
        }

        if (key === 'e' && playerRef.current.getRole() === "crewmate" && !sabotageActive && playerRef.current.getAction() !== 'SabotageActive') {
            taskAction();
        } else if (key === 'e' && playerRef.current.getRole() === "impostor") {
            return;
        }
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const [showMiniMap, setShowMiniMap] = useState(false);
    const [showMapButton, setShowMapButton] = useState(false);


    const handleShowMiniMap = () => {
        setShowMiniMap(!showMiniMap);
    };

    const openMiniGame = (minigame: React.ReactNode) => {
        setCurrentMiniGame(minigame);
        setIsModalVisible(true);
    };

    const closeMiniGame = () => {
        setIsModalVisible(false);
        setCurrentMiniGame(null);
    };

    const handleMiniGameCompletion = (gameType: string) => {
        closeMiniGame();
        const currentTime = Date.now();

        switch (gameType) {
            case "Guess the number":
                setLastCompletedGuessTheNumber(currentTime);
                break;
            case "Download the file":
                setLastCompletedDownloadFile(currentTime);
                break;
            case "Enter the number sequence":
                setLastCompletedEnterNumberSequence(currentTime);
                break;
            case "Answer the question":
                setLastCompletedAnswerQuestion(currentTime);
                break;
            case "Memory game":
                setLastCompletedMemoryGame(currentTime);
                break;
            default:
                break;
        }

        if (gameType === "Guess the number") {
            clearTask(gameType);
            webSocketServiceRef.current.sendTaskResolved("Guess the number", 11, 5);
        } else if (gameType === "Download the file") {
            webSocketServiceRef.current.sendTaskResolved("Download the file", 58, 7);
            clearTask("Download the file");
        } else if (gameType === "Enter the number sequence") {
            webSocketServiceRef.current.sendTaskResolved("Enter the number sequence", 72, 17);
            clearTask(gameType);
        } else if (gameType === "Answer the question") {
            webSocketServiceRef.current.sendTaskResolved("Answer the question", 51, 37);
            clearTask(gameType);
        } else if (gameType === "Memory game") {
            webSocketServiceRef.current.sendTaskResolved("Memory game", 9, 25);
            clearTask(gameType);
        }

        playerInstance();
        // setShowTaskList(false);
        // setShowTaskList(true);
    };

    const clearTask = (taskName: string) => {
        if (playerRef.current.getTask1() === taskName) {
            playerRef.current.setTask1("");
        } else if (playerRef.current.getTask2() === taskName) {
            playerRef.current.setTask2("");
        } else if (playerRef.current.getTask3() === taskName) {
            playerRef.current.setTask3("");
        }
        playerInstance();
    };


    const taskAction = () => {
        if (GridService.isTask(playerRef.current.getY(), playerRef.current.getX()) && !sabotageActive) {
            const xPosTask = GridService.getXPosTask(playerRef.current.getX(), playerRef.current.getY());
            const yPosTask = GridService.getYPosTask(playerRef.current.getX(), playerRef.current.getY());

            if (xPosTask != null && yPosTask != null) {
                const currentTime = Date.now();
                const cooldown = 1 * 60 * 1000; // 1 minutes in milliseconds

                if ((xPosTask === 11 && yPosTask === 5) && (playerRef.current.getTask1() === "Guess the number" || playerRef.current.getTask2() === "Guess the number" || playerRef.current.getTask3() === "Guess the number")) {
                    if (!lastCompletedGuessTheNumber || (currentTime - lastCompletedGuessTheNumber > cooldown)) {
                        openMiniGame(<GuessTheNumberMiniGame
                            onCompletion={() => handleMiniGameCompletion("Guess the number")}/>);
                    } else {
                        alert("You must wait for the cooldown period to expire before playing this mini-game again.");
                    }
                } else if ((xPosTask === 55 && yPosTask === 15) && (playerRef.current.getTask1() === "Download the file" || playerRef.current.getTask2() === "Download the file" || playerRef.current.getTask3() === "Download the file")) {
                    if (!lastCompletedDownloadFile || (currentTime - lastCompletedDownloadFile > cooldown)) {
                        openMiniGame(<DownloadMiniGame
                            onCompletion={() => handleMiniGameCompletion("Download the file")}/>);
                    } else {
                        alert("You must wait for the cooldown period to expire before playing this mini-game again.");
                    }
                } else if ((yPosTask === 15 && (xPosTask === 67 || xPosTask === 68)) && (playerRef.current.getTask1() === "Enter the number sequence" || playerRef.current.getTask2() === "Enter the number sequence" || playerRef.current.getTask3() === "Enter the number sequence")) {
                    if (!lastCompletedEnterNumberSequence || (currentTime - lastCompletedEnterNumberSequence > cooldown)) {
                        openMiniGame(<ClickInOrderMiniGame
                            onCompletion={() => handleMiniGameCompletion("Enter the number sequence")}/>);
                    } else {
                        alert("You must wait for the cooldown period to expire before playing this mini-game again.");
                    }
                } else if ((yPosTask === 34 && (xPosTask === 50 || xPosTask === 51)) && (playerRef.current.getTask1() === "Answer the question" || playerRef.current.getTask2() === "Answer the question" || playerRef.current.getTask3() === "Answer the question")) {
                    if (!lastCompletedAnswerQuestion || (currentTime - lastCompletedAnswerQuestion > cooldown)) {
                        openMiniGame(<NumpadInputCodeMiniGame
                            onCompletion={() => handleMiniGameCompletion("Answer the question")}/>);
                    } else {
                        alert("You must wait for the cooldown period to expire before playing this mini-game again.");
                    }
                } else if ((yPosTask === 26 && xPosTask === 10) && (playerRef.current.getTask1() === "Memory game" || playerRef.current.getTask2() === "Memory game" || playerRef.current.getTask3() === "Memory game")) {
                    if (!lastCompletedMemoryGame || (currentTime - lastCompletedMemoryGame > cooldown)) {
                        openMiniGame(<MemoryMiniGame onCompletion={() => handleMiniGameCompletion("Memory game")}/>);
                    } else {
                        alert("You must wait for the cooldown period to expire before playing this mini-game again.");
                    }
                }
            }
        }
    };


    const dead = () => {
        playerRef.current.setColor("dead");
        setShowKillCrewMate(true);

        setTimeout(() => {
            setShowKillCrewMate(false);
        }, 3000);
    }

    const impostorWinsTheGame = () => {
        setShowTaskBar(false);
        setShowTaskList(false);
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
        setShowTaskBar(false);
        setShowTaskList(false);
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
        webSocketServiceRef.current.sendReportButtonPressed();
    }

    const handleButtonPress = (votedFor: string) => {
        webSocketServiceRef.current.sendVotingButtonPressed(votedFor);
    }

    const votingActive = (deadPlayer) => {
        if (playerRef.current.getColor() === 'dead' || playerRef.current.getColor() === 'ghost') {
            setShowVotingActive(true);
        } else {
            setDeadPlayer(deadPlayer);
            setShowVotingbox(true);
        }
    }

    const votingNotActive = () => {
        if (playerRef.current.getColor() === 'dead' || playerRef.current.getColor() === 'ghost') {
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
        // setShowMap(false);
        setShowOtherPlayerEjected(true);
        setTimeout(() => {
            setShowOtherPlayerEjected(false);
            setShowMap(true);
        }, 3000);
    }

    const noOneGotEjected = () => {
        // setShowMap(false);
        setNoOneGotEjected(true);
        setTimeout(() => {
            setNoOneGotEjected(false);
            setShowMap(true);
        }, 3000);
    }

    const constSabotageActive = () => {
        setSabotageActive(true);
    }

    const constSabotageNotActive = () => {
        setSabotageActive(false);
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
                            {showChatbox ? <Chatbox playerColor={playerRef.current.getColor()}
                                                    playerName={playerRef.current.getUserName()}></Chatbox> :
                                <div></div>
                            }
                            <div className="col-span-01 text-3xl text-cyan-500 text-center">
                                {playerRef.current.getUserName()}
                            </div>
                            {showVotingbox ?
                                <Votingbox onButtonPress={handleButtonPress} currentPlayer={playerRef.current}
                                           otherPlayers={otherPlayers} deadPlayer={deadPlayer}></Votingbox> :
                                <div></div>
                            }
                            {showVotingActive ? <VotingActive></VotingActive> : <div></div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-1">
                        <div className="col-span-8 border-solid rounded-lg w-1/2 justify-self-">
                            {showTaskBar ?
                                <TaskProgress percentage={completedTasksCount}/> : <div></div>
                            }
                        </div>
                        <div className="col-span-4 border-solid rounded-lg justify-self-end mr-2 mt-o">

                            {showMapButton && (
                                <button
                                    onClick={handleShowMiniMap}
                                    className="bg-blue-300 hover:bg-blue-700 rounded-lg py-3 px-8 mr-12">
                                    Map
                                </button>
                            )}

                            {/*<button onClick={onQuit}
                                    className="bg-gray-700 hover:bg-gray-800 rounded-lg py-3 px-8">Quit
                            </button>*/}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-8 gap-5 h-5/6">
                        <div>
                            {showTaskList ?
                                <TaskList role={playerRef.current.getRole()} tasks={tasks}/> : <div></div>
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

                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            {showMap ? <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}
                                                reportButtonClicked={reportButtonClicked} onKeyClick={taskAction}/> :
                                <div></div>}

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
                            {showWaitingRoom ? <WaitingRoom/> : <div></div>}
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
                        {showMiniMap && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div
                                    className="relative flex flex-col items-center miniMapBackground rounded-lg p-8 w-2/3 h-1/2">
                                    <button
                                        onClick={handleShowMiniMap}
                                        className="absolute bottom-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>
                    <KeyInput onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </div>
    );
};

export default CurrentPlayers;
