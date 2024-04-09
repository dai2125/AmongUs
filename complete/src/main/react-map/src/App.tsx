
import React, { useState } from 'react';
import KeyInputs from "./KeyInputs/KeyInputs";
import MapGrid from './MapGrid/MapGrid';
import style from './AppStyle.module.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import HomePage from "./HomePage";
import GameComponent from "./MapGrid/MapGrid";
import LogIn from "./Log-in";
import CreateAccount from "./CreateAccount";

const App: React.FC = () => {
    const [xPos, setXPos] = useState<number>(2);
    const [yPos, setYPos] = useState<number>(2);
    const [showMapGrid, setShowMapGrid] = useState<boolean>(false);
    const [showHomePage, setShowHomePage] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(true);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);

    const handleLogin = () => {
        setShowLogIn(false);
        setShowHomePage(true);
    };
    const handleCreate = () => {

    };

    const handleCreateNav = () => {
      setShowCreateAccount(true);
      setShowLogIn(false);
    };

    const handleLogInNav = () => {
        setShowLogIn(true);
        setShowCreateAccount(false);
    };
    const handlePlay = () => {
        setShowMapGrid(true);
        setShowHomePage(false);
    };

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
            {showCreateAccount && <CreateAccount onCreate={handleCreate} onLogInNavClick={handleLogInNav}/>}
        </div>
    );
};


// return (
//     <div className={style.root}>
//         {/*<MapGrid canvasId="canvasId"/>*/}
//         {/*<MapGrid/>*/}
//         <KeyInputs/>
//         <MapGrid xPos={xPos} yPos={yPos} onMove={handleMove} />
//     </div>
// );
// }

export default App;
