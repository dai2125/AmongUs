import React, {useEffect, useState} from 'react';
import youKilledACrewmate from "../src/Images/Kill/youKilledACrewmate.jpg";

const YouKilledACrewmate = ({onStart}) => {

    const [count, setCount] = useState(1);

    useEffect(() => {
        if (!count) {
            onStart();
            return;
        }

        const id = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);

        return () => clearInterval(id);
    }, [count, onStart]);

    return (
        <div>
            <img src={youKilledACrewmate} style={{
                position: 'fixed',
                top: '0',
                left: '0',
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto'
            }}></img>
        </div>
    );
}

export default YouKilledACrewmate;
