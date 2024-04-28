import React, { useState } from 'react';

import HomePage from "./HomePage";
import LogIn from "./Log-in";
import CreateAccount from "./CreateAccount";
import AllPlayer from "./AllPlayer";
import CurrentPlayers from "./MapGrid/CurrentPlayers";

let loggedInUser: string;

const App: React.FC = () => {

    const [showMapGrid, setShowMapGrid] = useState<boolean>(true);
    const [showHomePage, setShowHomePage] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(false);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
    const [showAllPlayer, setShowAllPlayer] = useState<boolean>(false);

    // navigation and login
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
                    alert("Log In Successful");
                    console.log(data);
                    setShowHomePage(true);
                    setShowLogIn(false);
                    loggedInUser = name;
                }else{
                    alert("Name or Password is wrong");
                    console.log(data.status);
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
            alert("password and confirm-password do not match")
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
                        alert("Account Created Successfully");
                        setShowCreateAccount(false);
                        setShowLogIn(true);
                    }else{
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


    const handleStart = () => {
        setShowMapGrid(false);
        // TODO show all players -> show the role of the player -> then to the game
        setShowAllPlayer(true);
    }

    return (
        <div>
            {showHomePage && <HomePage loggesInUser={loggedInUser} onPlayButtonClick={handlePlay}/>}
            {showLogIn && <LogIn onLogIn={handleLogin} onCreateAccountNav={handleCreateNav}/>}
            {showMapGrid && <CurrentPlayers onQuit={handleQuit} onStart={handleStart}/>}
            {showCreateAccount && <CreateAccount onCreateClick={handleCreate} onLoginNavClick={handleLogInNav}/>}
            {showAllPlayer && <AllPlayer/>}
        </div>
    );};

export default App;