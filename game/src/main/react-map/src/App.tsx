import React, {useEffect, useState} from 'react';

import HomePage from "./MainPage/HomePage";
import LogIn from "./MainPage/Log-in";
import CreateAccount from "./MainPage/CreateAccount";
import CurrentPlayers from "./CurrentPlayers";
import {User} from "./User";

//Test Games
import MiniGame1 from './Minigame/GuessTheNumber/MiniGame1';
import MiniGame2 from './Minigame/Download/MiniGame2';
import MiniGame3 from './Minigame/ClickInOrder/MiniGame3';
import MiniGame4 from './Minigame/NumpadInputCode/MiniGame4';
import MiniGame5 from './Minigame/Memory/MiniGame5';
import Modal from './Minigame/Modal/Modal';


let loggedInUser: User;
// const userColor: string = "pink";
// loggedInUser.setColor("pink");

const App: React.FC = () => {

    const [userName, setUserName] = useState('');
    const [userColor, setUserColor] = useState("pink");
    const [showLogIn, setShowLogIn] = useState<boolean>(false);
    const [showMapGrid, setShowMapGrid] = useState<boolean>(true);
    const [showHomePage, setShowHomePage] = useState<boolean>(false);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);

    //Test Games
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMinigame, setCurrentMinigame] = useState<React.ReactNode>(null);



    const handleLogin = (name:string, password: string) => {

        const user ={
            name : name,
            password: password
        }

        fetch('http://localhost:8080/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(data => {
                if(data.status === 200){
                    // alert("Log In Successful");
                    setShowHomePage(true);
                    setShowLogIn(false);
                    setUserName(name);
                    loggedInUser.setUsername(name);
                    loggedInUser.setPassword(password);
                    loggedInUser.setColor("red");
                } else {
                    // alert("Name or Password is wrong");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCreate = (name:string, email: string, password: string, passwordConfirm: string) => {

        const newUser = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }

        if(!(password === passwordConfirm)){
            // alert("password and confirm-password do not match")
        }else {

            fetch('http://localhost:8080/signUp',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then((data) => {
                    if (data.status === 200){
                        // alert("Account Created Successfully");
                        setShowCreateAccount(false);
                        setShowLogIn(true);
                    } else {
                        alert("Failed to create account, please make sure to enter all fields correctly");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };
    // navigation
    const handleCreateNav = () => {
        setShowCreateAccount(true);
        setShowLogIn(false);
    };
    // navigation
    const handleLogInNav = () => {
        setShowLogIn(true);
        setShowCreateAccount(false);
    };
    // navigation
    const handlePlay = () => {
        setShowMapGrid(true);
        setShowHomePage(false);
    };
    // navigation
    const handleQuit = () => {
        setShowMapGrid(false);
        setShowHomePage(true);
    };

    useEffect(() => {
    }, [userName]);


    //Test Games
    const openMinigame = (minigame: React.ReactNode) => {
        setCurrentMinigame(minigame);
        setIsModalVisible(true);
    };

    const closeMinigame = () => {
        setIsModalVisible(false);
        setCurrentMinigame(null);
    };

    const handleMinigameCompletion = () => {
        closeMinigame();
        // TODO Send completion message to server
    };


//Test Games
    return (
        <div>
            <h1>Main Game</h1>
            <button onClick={() => openMinigame(<MiniGame1 onCompletion={handleMinigameCompletion}/>)}>Play MiniGame 1
            </button>
            <button onClick={() => openMinigame(<MiniGame2 onCompletion={handleMinigameCompletion}/>)}>Play MiniGame 2
            </button>
            <button onClick={() => openMinigame(<MiniGame3 onCompletion={handleMinigameCompletion}/>)}>Play MiniGame 3
            </button>
            <button onClick={() => openMinigame(<MiniGame4 onCompletion={handleMinigameCompletion}/>)}>Play MiniGame 4
            </button>
            <button onClick={() => openMinigame(<MiniGame5 onCompletion={handleMinigameCompletion}/>)}>Play MiniGame 5
            </button>
            <Modal isVisible={isModalVisible} onClose={closeMinigame}>
                {currentMinigame}
            </Modal>


            {showHomePage &&
                <HomePage setUserColor={setUserColor} loggesInUser={loggedInUser} onPlayButtonClick={handlePlay}/>}
            {showLogIn && <LogIn onLogIn={handleLogin} onCreateAccountNav={handleCreateNav}/>}
            {showMapGrid && <CurrentPlayers userName={userName} userColor={userColor} onQuit={handleQuit}/>}
            {showCreateAccount && <CreateAccount onCreateClick={handleCreate} onLoginNavClick={handleLogInNav}/>}


        </div>
    );
};

export default App;
