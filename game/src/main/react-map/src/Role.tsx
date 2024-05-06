import React, {useEffect, useState} from 'react';
import roleCrewmate from "./images/Crewmate_Role_Reveal.jpg"
// import roleImpostor from "../src/Impostor_Role_Reveal.jpg"

// TODO if role is impostor, show roleImpostor else show roleCrewmate
const Role = ({onStart}) => {

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

    return (
        <div>
            <img src={roleCrewmate} style={{position: 'fixed', top: '0', left: '0', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto'}} ></img>
        </div>
    );
}

export default Role;
