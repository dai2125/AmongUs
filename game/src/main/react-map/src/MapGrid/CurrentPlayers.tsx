import React, { useEffect, useRef, useState } from 'react';
import WebSocketService from './WebSocketService';
import MapGrid from './MapGrid';
import KeyInput from './KeyInputs';
import { Player } from './Player';
import chatButton from "../../../resources/images/chat_button.png";
import Chatbox from "../Chatbox";
import Timer from "../Timer";
import MapGrid2 from "./MapGrid2";
import Role from "../Role";
import ThereIsAImpostorAmongUs from "../ThereIsAImpostorAmongUs";
import Shhhhh from "../Shhhhh";
import RoleImpostor from "../RoleImpostor";
import TaskBar from "../TaskBar";
import TaskList from "../TaskList";

type Props ={
    onQuit: () => void;
};

const CurrentPlayers: React.FC<Props> = ({onQuit}) => {
    const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const playerRef = useRef<Player>(new Player('', '', '', 2, 2, '', '', '', ''));
    const [chatVisible, setChatVisible] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [showShhhhh, setShowShhhhh] = useState(false);
    const [showThereIsAImpostorAmoungUs, setShowThereIsAImpostorAmoungUs] = useState(false);
    const [showRole, setShowRole] = useState(false);
    const [showRoleImpostor, setShowRoleImpostor] = useState(false);
    const [showTaskBar, setShowTaskBar] = useState(true);

    const toggleChat = () => {
        if(!chatVisible) {
            setChatVisible(true);
        } else {
            setChatVisible(false);
        }
    };

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
        webSocketServiceRef.current = new WebSocketService(playerRef, setOtherPlayers, handleStartTimer);
        webSocketServiceRef.current.connect();
        return () => {
        };
    }, []);

    const handleKeyPress = (key: string) => {
        if (webSocketServiceRef.current) {
            const { current: webSocketService } = webSocketServiceRef;
            webSocketService.sendMovement(key);
        }
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };



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
                            <button className="w-10 h-10" onClick={toggleChat}><img alt="chatButton"
                                                                                    className="w-10 b-10 "
                                                                                    src={chatButton}></img></button>
                            {/* Chat-Fenster, das nur sichtbar ist, wenn chatVisible true ist */}
                            {chatVisible ?
                                <Chatbox/> : <div></div>
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">

                        <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-">
                            { showTaskBar ?
                                <TaskBar/> : <div></div>
                            }
                            <p className="font-bold m-10 underline-offset-1">Completed Tasks</p>
                        </div>
                        <div>
                            <TaskList/>
                        </div>
                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            {mapVisible ?
                                <MapGrid currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/> :
                                <MapGrid2 currentPlayer={playerRef.current} otherPlayers={otherPlayers || []}/>
                            }
                        </div>
                        <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">
                            <button
                                className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings

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

                    <div className="grid grid-cols-12 row-span-9 gap-5 h-5/6">

                        <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-end">
                            <p className="font-bold m-10 underline-offset-1">Completed Tasks</p>
                        </div>
                        <div className="col-span-6 border-solid rounded-lg flex justify-center items-center">
                            <MapGrid
                                currentPlayer={playerRef.current}
                                otherPlayers={otherPlayers || []}
                            />
                        </div>
                        <div className="col-span-3 border-solid rounded-lg w-1/2 justify-self-start">
                            <button onClick={togglePopup}
                                    className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Settings
                            </button>
                            <button
                                className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Map
                            </button>
                            <button
                                onClick={onQuit}
                                className="bg-gray-700 hover:bg-gray-800 text-white w-full font-bold py-2 px-4 rounded m-10">Quit
                            </button>
                        </div>
                    </div>
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
                </div>
            </div>
            <KeyInput onKeyPress={handleKeyPress}/>
        </div>
    );
};

export default CurrentPlayers;
