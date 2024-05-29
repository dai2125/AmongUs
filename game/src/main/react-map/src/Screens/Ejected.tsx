import React, {useEffect, useState} from 'react';
import ejected from "../Images/Ejected/Ejected.jpg";

const Ejected = ({onStart}) => {

    const [count, setCount] = useState(5);

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
            <img src={ ejected } style={{position: 'fixed', top: '0', left: '0', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto'}} ></img>
        </div>
    );
}

export default Ejected;
