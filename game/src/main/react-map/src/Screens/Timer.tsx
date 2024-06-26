import React, {useState, useEffect} from 'react';

const Timer = ({onStart}) => {
    const [count, setCount] = useState(3);

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

    const formattedCount = count.toString().padStart(2, '0');

    return <div style={{
        color: 'white', fontSize: '2.5em', fontWeight: 'bold', fontFamily: "'VCR OSD Mono', monospace",
    }}>Lobby is full Spaceship takes off in {formattedCount}</div>;
};

export default Timer;
