import React, {useEffect, useState} from 'react';
import airSystemButton from "../Images/Buttons/Vent_Button.png";

const AirSystem = () => {

    const [count, setCount] = useState(3);

    useEffect(() => {
        if (!count) {
            // onStart();
            return;
        }

        const id = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);

        return () => clearInterval(id);
    }, [count]);

    return (
        <div style={{backgroundColor: 'black', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={airSystemButton} style={{width: 'auto', height: 'auto'}} />
            <p style={{color: 'white'}}>You went through the air System! Good job</p>
        </div>
    );
}

export default AirSystem;
