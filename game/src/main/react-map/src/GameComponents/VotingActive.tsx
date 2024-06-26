import React from 'react';
import votingboxBackground from '../Images/Votingbox/Votingbox_background.png';

import '../CSS/Votingbox.css';

function VotingActive ()  {

    return (
        <div className="votingbox" style={{backgroundImage: `url(${votingboxBackground}`}}>
            <div className="votingbox-header">
                <div></div>
                <h1>You´re dead please wait till the voting is over</h1>
            </div>
        </div>
    )
}

export default VotingActive;
