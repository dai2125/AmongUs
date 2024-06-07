import React, {useEffect, useState} from 'react';

import HomePage from "./MainPage/HomePage";
import LogIn from "./MainPage/Log-in";
import CreateAccount from "./MainPage/CreateAccount";
import CurrentPlayers from "./CurrentPlayers";
import {User} from "./User";

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

    const handleLogin = (user: User) => {

        loggedInUser = user;
        setShowHomePage(true);
        setShowLogIn(false)
        // setUserName(name);
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


    return (
        <div>
            {showHomePage &&
                <HomePage setUserColor={setUserColor} loggesInUser={loggedInUser} onPlayButtonClick={handlePlay}/>}
            {showLogIn && <LogIn onLogIn={handleLogin} onCreateAccountNav={handleCreateNav}/>}
            {showMapGrid && <CurrentPlayers userName={userName} userColor={userColor} onQuit={handleQuit} />}
            {showCreateAccount && <CreateAccount onLoginNavClick={handleLogInNav}/>}
        </div>
    );
};

export default App;
