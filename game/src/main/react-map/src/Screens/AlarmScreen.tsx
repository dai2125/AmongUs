import React, {useEffect, useState} from 'react';
import sabotageButton from "../Images/Buttons/Sabotage_Button.png";

const AlarmScreen = () => {

    const [count, setCount] = useState(3);

    useEffect(() => {
        if (!count) {
            return;
        }

        const id = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);

        return () => clearInterval(id);
    }, [count]);

    return (
        <div style={{backgroundColor: 'black', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={sabotageButton} style={{width: 'auto', height: 'auto'}} />
            <p style={{color: 'white'}}>You got sabotaged! Quick run to the Safety Points</p>
        </div>
    );
}

export default AlarmScreen;
