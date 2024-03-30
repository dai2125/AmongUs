import React, { useState } from 'react';
import MapGrid from './MapGrid/MapGrid';
import style from './AppStyle.module.css';

const App: React.FC = () => {
  const [xPos, setXPos] = useState<number>(2);
  const [yPos, setYPos] = useState<number>(2);

  const handleMove = (newX: number, newY: number) => {
    // Perform validation here if needed
    setXPos(newX);
    setYPos(newY);
  };

  return (
      <div className={style.root}>
        <MapGrid xPos={xPos} yPos={yPos} onMove={handleMove} />
      </div>
  );
}

export default App;
