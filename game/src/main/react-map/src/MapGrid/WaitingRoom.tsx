import React from 'react';
import  '../CSS/WaitingRoom.css';

import ghost from '../Images/Character_Ghost_Movement/Ghost_South.png';
import red from '../Images/Character_Red_Movement/Red_South_Left.png';
import green from '../Images/Character_Green_Movement/Green_South_Right.png';
import lime from '../Images/Character_Lime_Movement/Lime_South_Left.png';

interface WaitingMessageProps {
}

const WaitingMessage: React.FC<WaitingMessageProps> = () => {
    return (
        <div className="waiting-room-message">
            <p>Waiting for others</p>
            <img src={ghost} alt="Yellow" className="floating-image" style={{animationName: 'float1, rotate'}}/>
            <img src={red} alt="Blue" className="floating-image" style={{animationName: 'float2, rotate'}}/>
            <img src={green} alt="Green" className="floating-image" style={{animationName: 'float3, rotate'}}/>
            <img src={lime} alt="Red" className="floating-image" style={{animationName: 'float4, rotate'}}/>
            {/*<img src={ghost} alt="Ghost" className="floating-image"/>*/}
        </div>
    );
}

export default WaitingMessage;
