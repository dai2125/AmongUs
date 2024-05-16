import React, { useEffect, useRef, useState } from 'react';
import WebSocketService from './WebSocketService';
import MapGrid from './MapGrid';
import KeyInput from './KeyInputs';
import { Player } from './Player';
import Chatbox from "../Chatbox";
import Timer from "../Timer";
import Role from "../Role";
import ThereIsAImpostorAmongUs from "../ThereIsAImpostorAmongUs";
import Shhhhh from "../Shhhhh";
import RoleImpostor from "../RoleImpostor";
import TaskBar from "../TaskBar";
import TaskList from "../TaskList";
import { GridService } from "./GridService";
import KillCrewMate from "../KillCrewMate";
import MapGridRECOVER from "./MapGridRECOVER";

interface Props {
    userColor : string;
    userName : string;
    onQuit: () => void;
}

const CurrentPlayers: React.FC<Props> = ({onQuit, userColor, userName}) => {
    // const [mapVisible, setMapVisible] = useState(false);
    const [task1, setTask1] = useState('');
    const [task2, setTask2] = useState('');
    const [task3, setTask3] = useState('');
    const [totalTasks, setTotalTasks] = useState(9);
    const [tasks, setTasks] = useState({ task1: '', task2: '', task3: '' });
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

    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const playerRef = useRef<Player>(new Player(userName, '', '', '', 2, 2, '', '', '', ''));


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
        if(!timerStarted) {
            setTimerStarted(true);
        }
    }

    const onStart = () => {
        setTimerStarted(false);
        setShowShhhhh(true);
    }

    const handleShhhhh = () => {
        setShowShhhhh(false);
        setShowThereIsAImpostorAmoungUs(true);
    }

    const handleThereIsAImpostorAmongUs = () => {
        setShowThereIsAImpostorAmoungUs(false);
        if(playerRef.current.getRole() === "impostor") {
            setShowRoleImpostor(true);
        } else {
            setShowRole(true);
        }
    }

    const handleRole = () => {
        setShowRole(false);
        setShowRoleImpostor(false);
        setShowTaskBar(true);
    }

    useEffect(() => {
        webSocketServiceRef.current = new WebSocketService(playerRef,
                                                            setOtherPlayers,
                                                            handleStartTimer,
                                                            setTasks,
                                                            setCrewmateDead,
                                                            updateTasks,
                                                            dead);
        webSocketServiceRef.current.connect();
        return () => {
        };
    }, []);


    const handleKeyPress = (key: string) => {
        if(key === 'w' && playerRef.current.getRole() === 'crewmate') {
            taskAction();
        }
        else if(key === 'e' && playerRef.current.getRole() === 'impostor') {
            taskKill(key);
        }
        else if (webSocketServiceRef.current) {
            const { current: webSocketService } = webSocketServiceRef;
            webSocketService.sendMovement(key);
        }
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const taskAction = () => {
        if(GridService.isTask(playerRef.current.getY(), playerRef.current.getX())) {
            // TODO open task box
            // TODO if task is completed send message to MovementController
            webSocketServiceRef.current.sendTaskDone("task1");
        }
    }

    const taskKill = (key: string) => {
        webSocketServiceRef.current.sendKill(key);

    }

    const updateTasks = () => {
        if(completedTasksCount < 9) {
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


    return (
        <div>
            <div className="background">
                <div className="grid grid-rows-10 h-screen w-screen  ">
                    <div className="row-span-1 ">
                        <div
                            className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2">
                            <div id="user-div" className="col-span-1"></div>
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
                            <Chatbox></Chatbox>
                        </div>
                    </div>
                    {/*<div >{purple}</div>*/}
                    <div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">
                    <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-">
                            { showTaskBar ?
                                // <TaskBar  /> : <div></div>
                                <TaskBar completedTasksCount={completedTasksCount} /> : <div></div>
                            }
                        </div>

                        <div>
                            <TaskList tasks={tasks} />
                            {/*<TaskList/>*/}
                            {/*{ showTaskList ?`*/}
                            {/*    <TaskList/> : <div></div>`*/}
                            {/*}*/}
                        </div>
                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            <MapGridRECOVER currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/>
                            {/*{mapVisible ?*/}
                            {/*    <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/> :*/}
                            {/*    <div></div>*/}
                            {/*}*/}
                        </div>
                        {/*<div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">*/}
                        {/*    <button className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings</button>*/}

                    {showPopup && (
                        <div id="popup" className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
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
                    <div style={{ position: 'absolute', bottom: '0', right: '0', marginRight: '10px', marginBottom: '10px' }}>
                        { timerStarted ? <Timer onStart={onStart}/> : <div></div> }
                    </div>
                    <div>
                        { showShhhhh ? <Shhhhh onStart={handleShhhhh}/> : <div></div> }
                    </div>
                    <div>
                        { showThereIsAImpostorAmoungUs ? <ThereIsAImpostorAmongUs onStart={handleThereIsAImpostorAmongUs}/> : <div></div> }
                    </div>
                    <div>
                        { showRole ? <Role onStart={handleRole}/> : <div></div> }
                    </div>
                    <div>
                        { showRoleImpostor ? <RoleImpostor onStart={handleRole}/> : <div></div> }
                    </div>
                    <div>
                        { showKillCrewMate ? <KillCrewMate onStart={handleRole}/> : <div></div> }
                    </div>
                    <div>
                        {/*{ showKillImpostor ? <KillImpostor onStart={handleRole}/> : <div></div> }*/}
                    </div>
                {/*</div>*/}
            </div>
            <KeyInput onKeyPress={handleKeyPress}/>
        </div>
            </div>
        </div>
    );
};

export default CurrentPlayers;
