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

const App: React.FC = () => {
  const [xPos, setXPos] = useState<number>(2);
  const [yPos, setYPos] = useState<number>(2);


  const handleMove = (newX: number, newY: number) => {
    // Perform validation here if needed
    setXPos(newX);
    setYPos(newY);
    console.log('App.tsx: handleMove: newX: ', newX, ' newY: ', newY);
  };

  return (
      <Router>
          <div>
              {/* Navigation */}
              {/*<nav>*/}
              {/*    <ul>*/}
              {/*        <li>*/}
              {/*            <Link to="/">Home</Link>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <Link to="/play">Play</Link>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <Link to="/account">Account</Link>*/}
              {/*        </li>*/}
              {/*    </ul>*/}
              {/*</nav>*/}

              {/* Routen */}
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/play" element={<MapGrid /*xPos={xPos} yPos={yPos} onMove={handleMove}*/ />} />
                  {/*<Route path="/account" element={<Account />} />*/}
              </Routes>
          </div>
      </Router>
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
