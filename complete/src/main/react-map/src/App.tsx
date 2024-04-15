
import React, { useState } from 'react';
import MapGrid from './MapGrid/MapGrid';
//import style from './AppStyle.module.css';
import HomePage from "./HomePage";
//import GameComponent from "./MapGrid/MapGrid";
import LogIn from "./Log-in";
import CreateAccount from "./CreateAccount";
import {User} from "./User";

const App: React.FC = () => {

    const [xPos, setXPos] = useState<number>(2);
    const [yPos, setYPos] = useState<number>(2);
    const [showMapGrid, setShowMapGrid] = useState<boolean>(false);
    const [showHomePage, setShowHomePage] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(true);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);

    let loggedInUser: User;
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
            .then(response => response.json())
            .then(data => {
                //handle the response
                console.log(data);

                loggedInUser = new User(data.name, data.email, data.password);

            })
            .catch(error => {

                console.error('false log in credentials:', error);
            });

        setShowLogIn(false);
        setShowHomePage(true);


    };
    const handleCreate = (name:string, email: string, password: string) => {

        const newUser ={
            name: name,
            email: email,
            password: password,
            passwordConfirm: password
        }

        fetch('http://localhost:8080/signUp',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                //handle the response
                // TODO if data is 200 || correct || user created
                if (data != null){
                    console.log('Successful');
                    // setShowHomePage(true);
                    // setShowCreateAccount(false);
                    setShowCreateAccount(false);
                    setShowLogIn(true);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });


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


    const handleMove = (newX: number, newY: number) => {
        // Perform validation here if needed
        setXPos(newX);
        setYPos(newY);
        console.log('App.tsx: handleMove: newX: ', newX, ' newY: ', newY);
    };


    return (
        <div>
            {showHomePage && <HomePage onPlayButtonClick={handlePlay}/>}
            {showLogIn && <LogIn onLogIn={handleLogin} onCreateAccountNav={handleCreateNav}/>}
            {showMapGrid && <MapGrid xPos={xPos} yPos={yPos} onMove={handleMove} onQuit={handleQuit} />}
            {showCreateAccount && <CreateAccount onCreateClick={handleCreate} onLoginNavClick={handleLogInNav}/>}
        </div>
    );};


export default App;
