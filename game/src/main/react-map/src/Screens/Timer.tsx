import React, { useState, useEffect } from 'react';

const Timer = ({ onStart }) => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (!count) {
            onStart();
            // setShowShhhhh(true);
            return;
        }

        const id = setInterval(() => {
            setCount((count) => count - 1);
        }, 5000);

        return () => clearInterval(id);
    }, [count, onStart]);

    const formattedCount = count.toString().padStart(2, '0');

    return <div style={{ color: 'white', fontSize: '2em' }}>Lobby is full Spaceship takes off in {formattedCount}</div>;
};

export default Timer;
