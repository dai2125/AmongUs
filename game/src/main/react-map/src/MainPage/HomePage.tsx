import React, {FormEvent, useEffect, useRef, useState} from 'react';
import '../CSS/main.css'
import '../CSS/output.css';
import amongUsIcon from '../Images/Homepage/Among_Us_logo.png';
import AppearanceBox from "./AppearanceBox";
import {User} from "../User";
import '../CSS/HomePage.css';
import purple from "../Images/Character_Movement/Purple.png";
import red from "../Images/Character_Movement/red.jpg";
import blue from "../Images/Character_Movement/Blue.jpg";
import green from "../Images/Character_Movement/Green.jpg";
import orange from "../Images/Character_Movement/Orange.jpg";
import yellow from "../Images/Character_Movement/Yellow.png";
import black from "../Images/Character_Movement/Black.jpg";
import gray from '../Images/Characters/Gray.jpg';
import white from "../Images/Character_Movement/White.jpg";
import brown from "../Images/Character_Movement/Brown.jpg";
import cyan from "../Images/Character_Movement/Cyan.jpg";
import lime from "../Images/Character_Movement/Lime.jpg";
import pink from "../Images/Character_Movement/Pink.jpg";
import dead from "../Images/Character_Movement/dead.png";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

type Props ={
    loggesInUser: User;
    onPlayButtonClick(userColor, gameId): void;
    setUserColor(color: string): void;
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

export default function HomePage({ loggesInUser, onPlayButtonClick, setUserColor}: Props) {

    const [color, setColor] = useState("pink");
    const [playerImage, setPlayerImage] = useState(colorToImageUrl[color]);

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMessage , setErrorMessage] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [successMessage , setSuccessMessage] = useState("");
    const [showSocialBox, setShowSocialBox] = useState(false);
    const [errorOldPassword, setErrorOldPassword] = useState("");
    const [showAppearanceBox, setShowAppearanceBox] = useState(false);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showPlayOptions, setPlayOptions] = useState(false);
    const [showPopUp, setPopUp] = useState(false);
    const [showCustomPopUp, setCustomPopUp] = useState(false);
    const [gameId, setGameId] = useState('');


    const handleMyAccount = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        clearErrorMessages();

        const form = event.currentTarget;
        const data = new FormData(form);

        if (data.get('newUsername') === '' && data.get('newEmail')  === '') {
            // setErrorName("At least one field must be filled out");
            // setErrorEmail("At least one field must be filled out");
            setErrorOldPassword("Password must be entered")
            return;
        } else if (data.get('newPassword')  !== data.get('newPasswordConfirm') ) {
            setErrorPassword("Passwords do not match");
            return;
        } else if (data.get('oldPassword')  === '') {
            setErrorPassword("Please enter your old password");
            return;
        }

        const user = {
            oldName: loggesInUser.getUsername(),
            oldPassword: loggesInUser.getPassword(),
            newName: data.get('newUsername') as string,
            newEmail: data.get('newEmail') as string,
            oldPasswordInput: data.get('oldPassword') as string,
            newPassword: data.get('newPassword') as string,
            passwordConfirm: data.get('newPasswordConfirm') as string,
        }



        const passwordRegex = /^.{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(user.newEmail) &&
            (passwordRegex.test(user.newPassword)) &&
            (user.newPassword == user.passwordConfirm) &&
            (user.oldPassword == user.oldPasswordInput)) {

            fetch('http://localhost:8080/accountDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((data) => {
                if (data.status === 200) {
                    setSuccessMessage("Account Changed Successfully");
                    setErrorMessage("");
                    // alert("Account Created Successfully");
                    loggesInUser.setUsername(user.newName);
                    loggesInUser.setPassword(user.newPassword);

                } else if(data.status == 400){
                    setErrorMessage("Email is already taken");
                    setSuccessMessage("");
                } else {
                    setErrorMessage("Failed to create account, please make sure to enter all fields correctly");
                    setSuccessMessage("");
                    // alert("Failed to create account, please make sure to enter all fields correctly");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert("Email or password is not valid");
        }
    }

        const onMyAccountButtonClick = () => {
            if(!showAccountSettings) {
                setShowAccountSettings(true);
                setShowAppearanceBox(false);
                setPlayOptions(false);
            } else {
                setShowAccountSettings(false);
                setSuccessMessage("");
                setErrorMessage("");
            }
        }

        const onFriendsButtonClick = () => {
            if(!showSocialBox) {
                setShowSocialBox(true);
            } else {
                setShowSocialBox(false);
            }
        }

    const onMyAppearancesButtonClick = () => {
        if(!showAppearanceBox) {
            setShowAppearanceBox(true);
            setShowAccountSettings(false);
            setPlayOptions(false);
        } else {
            setShowSocialBox(false);
            setShowAccountSettings(false)
            setPlayOptions(false);
        }
    }

    const onPlayOptionsClick = () => {
        if(!showPlayOptions) {
            setPlayOptions(true);
            setShowAppearanceBox(false);
            setShowAccountSettings(false);
        } else {
            setShowSocialBox(false);
            setShowAccountSettings(false);
            setPlayOptions(false);
        }
    }

    const clearErrorMessages = () => {
        setErrorName("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorOldPassword("");
    }

    // const setUserColor = (color: string) => {
    //     loggesInUser.setColor(color);
    // }

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setUserColor(newColor);
        setPlayerImage(colorToImageUrl[newColor]);
    }

    const handlePopUp = () => {
        if(!showPopUp) {
           setPopUp(true);
        } else {
            setPopUp(false);
            setErrorMessage("");
            setSuccessMessage("");
        }
    }
    const handleCustomPopUp = () => {
        if(!showCustomPopUp) {
            setCustomPopUp(true);
        } else {
            setCustomPopUp(false);
            setErrorMessage("");
            setSuccessMessage("");
        }
    }

const clientRef = useRef(null);


    const handlePlay = (event) => {

        event.preventDefault();
        onPlayButtonClick(color, gameId);
        handlePopUp()

    }
    const handlePlayPrivate = (event: FormEvent<HTMLFormElement>) =>{

        event.preventDefault();

        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        const client = Stomp.over(socket);
        clientRef.current = client;

        const form = event.currentTarget;
        const data = new FormData(form);

        const gameId = data.get('gameId') as string;

        client.connect({}, () => {
            client.subscribe('/topic/tryConnect/', (message) => {
                const response = JSON.parse(message.body);

                if (response === 0) {
                    setErrorMessage("This Game does not exist");
                    setGameId("");
                } else if (response === 1) {
                    setErrorMessage("The Game is full");
                    setGameId("");
                } else if (response === 2) {
                    setGameId(gameId);
                    onPlayButtonClick(color, gameId);
                    handlePopUp();
                }
            });
            sendJoinRequest(gameId);
        });
    }
    const handleCustomGame = (event: FormEvent<HTMLFormElement>) => {

        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');

        const client = Stomp.over(socket);
        clientRef.current = client;

        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const gameId = data.get('gameId') as string;
        const imposters = data.get('imposters');
        const crewmates = data.get('crewmates')


        client.connect({},() =>{
            client.subscribe('/topic/createGame/', (message)=>{
                const response = JSON.parse(message.body);

                if(response === true){
                    //setGameId(gameId);
                    setErrorMessage("");
                    handleCustomPopUp();
                }else {
                    setErrorMessage("GameId is taken, choose a new one");
                    //alert("gameId is taken");
                }
            });
            sendCreateRequest(imposters, crewmates, gameId);
        });
    }

    const sendJoinRequest = (gameId) => {
        console.log("AAAAA");
        console.log(gameId);
        clientRef.current.send(`/app/tryConnect/`, {}, gameId);
    }

    const sendCreateRequest = (numberImposters, numberCrewmates, gameId) => {
        const payload = {
            gameId: gameId,
            crewmates: numberCrewmates,
            imposters: numberImposters

        };
        clientRef.current.send(`/app/createGame/`, {}, JSON.stringify(payload));
    }


    return (
        <div className="background grid grid-rows-12 min-h-screen w-screen p-10">
            {showCustomPopUp && (
                <div id="popup" className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">

                    <div className="grid grid-rows-3 bg-black border-double rounded-lg border-2 border-fuchsia-800 w-2/6 h-70">

                        <div className="grid grid-rows-2 row-span-1 flex items-center justify-center text-white">
                            <div className="row-span-1">
                                {errorMessage &&
                                    <p className="error-notification">{errorMessage}</p>}
                            </div>
                            <div className="row-span-1 flex items-center justify-center text-white">
                                <b>Game Settings</b>
                            </div>
                        </div>
                        <div className="row-span-2 justify-self-center">
                            <form onSubmit={handleCustomGame} className="p-3">
                                <div>
                                    <label className="text-white">Enter Game ID</label><br/>
                                    <input name="gameId"
                                        className="mt-1.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                    /><br/>
                                </div>

                                <label className="text-white">Number of Crewmates:</label><br/>
                                <input name="crewmates"
                                    type="number" max="8" min="1"
                                       className=" mt-1.5 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                        required/>

                                <label className="text-white">Number of imposters:</label><br/>
                                <input name="imposters"
                                    type="number" max="1" min="1"
                                       className=" mt-1.5 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                        required/>


                                <div className="flex justify-between">
                                    <button type="submit"
                                            className="bg-gray-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3">Save
                                    </button>
                                    <button onClick={handleCustomPopUp}
                                            className="bg-gray-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3">Close
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}
            {showPopUp && (
                <div id="popup"
                     className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">

                    <div
                        className="grid grid-rows-3 bg-black border-double rounded-lg border-2 border-fuchsia-800 w-2/6 h-70">
                        <div className="grid grid-rows-2 row-span-1 flex items-center justify-center text-white">
                            <div className="row-span-1">
                                {errorMessage &&
                                    <p className="error-notification">{errorMessage}</p>}
                            </div>
                            <div className="row-span-1 flex items-center justify-center text-white">
                                <b>Enter Game ID</b>
                            </div>
                        </div>
                        <div className="row-span-2 justify-self-center">
                            <form onSubmit={handlePlayPrivate} className="p-3 gameIdForm">
                                <div>
                                    <input name="gameId"
                                           className="mt-1.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                    /><br/>
                                </div>

                                <div className="flex justify-between">
                                    <button type="submit"
                                            className="bg-gray-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3">Save
                                    </button>
                                    <button onClick={handlePopUp}
                                            className="bg-gray-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3">Close
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}
            <div
                className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2 ">
                <div id="user-div" className="col-span-1" style={{backgroundImage: `url(${playerImage})`}}/>
                <div className="col-span-01 text-3xl text-cyan-500 text-center">
                    {loggesInUser.getUsername()}
                </div>
        {/*        <button onClick={onFriendsButtonClick}*/}
        {/*                className="col-span-10 w-1/6 h-10 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600 mt-1.5">*/}
        {/*    <b className="text-3xl">FRIENDS</b>*/}
        {/*</button>*/}
        {showSocialBox ?
            <div>
                {/*<Socialbox></Socialbox>*/}
            </div> :
            <div>

            </div>
        }
    </div>

    <div className="grid row-span-10 grid-cols-3 mb-5 gap-2">
        <div
            className="grid rows-8 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 col-span-1 w-full h-full justify-self-end">
            <div className="row-span-1">
                <img alt="amongUsIcon" src={amongUsIcon}></img>
                {/*<p className="text-5xl text-center font-light text-amber-600 underline">AMONG US</p>*/}
            </div>
            <div
                className="p-4 grid grid-rows-3 row-span-7 border-double rounded-lg border-2 border-fuchsia-800 w-11/12 h-5/6 justify-self-center align-items-center">
                <button onClick={onPlayOptionsClick}
                        className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="play">Play</b>
                        </button>

                        <button onClick={onMyAccountButtonClick}
                                className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="account">Account</b>
                        </button>
                        <button onClick={onMyAppearancesButtonClick}
                                className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="appearance">Appearance</b>
                        </button>
                    </div>

                </div>
                    <div className="bg-transparent border-double rounded-lg border-2 border-teal-400 col-span-2 w-full justify-self-start p-4">

                        {showPlayOptions && (
                            <div className="grid grid-rows-3 h-full ">
                                <div className="row-span-1 flex justify-center items-center">
                                    <button onClick={handlePlay}
                                        className="bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600 h-3/4 w-3/4">
                                        <b className="public">Public</b>
                                    </button>
                                </div>
                                <div className="grid grid-rows-2 col-span-1 ">
                                    <div className="row-span-2 flex justify-center items-center">
                                        <button onClick={handlePopUp}
                                            className="bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600 h-3/4 w-3/4">
                                            <b className="private">Private</b>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 col-span-1">
                                    <div className="row-span-3 flex justify-center items-center">
                                        <button onClick={handleCustomPopUp}
                                            className="bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600 h-3/4 w-3/4">
                                            <b className="custom-game">Custom game</b>
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                        {showAccountSettings ? (
                            <div>
                                <form onSubmit={handleMyAccount}>
                                    <p className="text-2xl text-left font-light text-amber-600 ">Account Settings
                                        {/*for {loggesInUser.getUsername()}*/}
                                    </p>
                                    <label className="form-label">New Username</label>
                                    <div className="form-row">
                                        <input name="newUsername"
                                               className="input-field"
                                               type="text" placeholder="Old or New Username"/>
                                        <div className="error-notification">{errorName}</div>
                                    </div>
                                    <label className="form-label">New Email</label>
                                    <div className="form-row">
                                        <input name="newEmail"
                                               className="input-field"
                                               type="text" placeholder="New Email"/>
                                        <div className="error-notification">{errorEmail}</div>
                                    </div>
                                    <label className="text-1xl text-left font-light text-amber-600 ">Password</label>
                                <div className="form-row">
                                        <input name="oldPassword" type="text"
                                               className="input-field"
                                               placeholder="Password"/>
                                        <div className="error-notification">{errorOldPassword}</div>
                                </div>
                                <label className="text-1xl text-left font-light text-amber-600">New Password</label>
                                <div className="form-row">
                                        <input name="newPassword" type="text"
                                               className="input-field"
                                               placeholder="New Password"/>
                                        <div className="error-notification">{errorPassword}</div>
                                </div>
                                <label className="text-1xl text-left font-light text-amber-600">Confirm New Password</label>
                                <div className="form-row">
                                            <input name="newPasswordConfirm" type="text"
                                                   className="input-field"
                                                   placeholder="Confirm Password"/>
                                            <div className="error-notification">{errorPassword}</div>
                                    </div>
                                    <br/>
                                    <button type="submit"
                                            className="w-full-myAccount h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                                        UPDATE MY ACCOUNT
                                    </button>
                                    {successMessage &&
                                        <p className="text-2xl-success text-left font-light text-amber-600 ">{successMessage}</p>}
                                    {errorMessage &&
                                        <p className="text-2xl-error text-left font-light text-amber-600 ">{successMessage}</p>}
                            </form>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div>
                        {showAppearanceBox ?
                            <div>
                                <AppearanceBox setUserColor={handleColorChange} ></AppearanceBox>
                            </div> :
                            <div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
