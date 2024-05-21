import React, {useEffect, useState} from 'react';
import votingboxBackground from '../Images/Votingbox/Votingbox_background.png';
import votingboxButton from '../Images/Buttons/Report_Button.jpg';
import votingboxChat from '../Images/Buttons/chat_button.png';
import skipVote from '../Images/Votingbox/Skip_vote.png';
import submitVote from '../Images/Votingbox/submit_vote.png';
import cancelVote from '../Images/Votingbox/cancel_vote.png';

import '../CSS/Votingbox.css';
import VotingChatbox from "./VotingChatbox";

// TODO Backend erstellen
// TODO Backend muss die Votes übernehmen
// TODO fertig designen

function Votingbox ({ playerColor, playerName, deadPlayer, reportPlayer, onButtonPress = () => {} }) {

    const [votingVisible, setVotingVisible] = useState(false);
    const [players, setPlayers] = useState([]);
    const [showVotingChatbox, setShowVotingChatbox] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        setPlayers([{userId: "Player1", color: "red"},
            {userId: "Player9", color: "cyan"},
            {userId: "Player2", color: "blue"},
            {userId: "Player3", color: "green"},
            {userId: "Player6", color: "black"},
            {userId: "Player7", color: "white"},
            {userId: "Player8", color: "brown"},
            {userId: "Player11", color: "pink"},
            {userId: "Player10", color: "lime"},
            {userId: "Player4", color: "orange"},
            {userId: "Player5", color: "yellow"},
            {userId: "Player12", color: "purple"}]);
        setVotes(new Array(players.length).fill(0));  // Aktualisiere votes, wenn players sich ändert
    }, [players.length]);

    const toggleVoting = () => {
        if (!votingVisible) {
            setVotingVisible(true);
        } else {
            setVotingVisible(false);
        }
    }

    if(players.length === 0) {
        setPlayers([{userId: "Player1", color: "red"},
            {userId: "Player9", color: "cyan"},
            {userId: "Player2", color: "blue"},
            {userId: "Player3", color: "green"},
            {userId: "Player6", color: "black"},
            {userId: "Player7", color: "white"},
            {userId: "Player8", color: "brown"},
            {userId: "Player11", color: "pink"},
            {userId: "Player10", color: "lime"},
            {userId: "Player4", color: "orange"},
            {userId: "Player5", color: "yellow"},
            {userId: "Player12", color: "purple"}]);
    }

    const handleItemClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleSubmitClick = (index) => {
        if (!hasVoted) {
            const newVotes = [...votes];
            newVotes[index] = (newVotes[index] || 0) + 1;
            setVotes(newVotes);
            setHasVoted(true);
        } else if (hasVoted) {
            resetVoting();
        }
    }


    const handleCancelClick = (index) => {
        resetVoting();
    }

    const resetVoting = () => {
        setVotes(new Array(players.length).fill(0));
        setHasVoted(false);
    }



    return (
        <div>
            <button className="w-10 h-10" onClick={toggleVoting}><img alt="reportButton"
                                                                      className="w-10 h-10 hover:bg-black"
                                                                      src={votingboxButton}></img></button>
            <div className={votingVisible ? "" : "hidden"}>
                <div className="votingbox" style={{backgroundImage: `url(${votingboxBackground}`}}>
                    <div className="votingbox-header">
                        <div></div>
                        <h1>Who Is The Impostor?</h1>
                        <VotingChatbox playerColor={ playerColor } playerName={ playerName }></VotingChatbox>
                        {/*<button><img className="votingboxChatButton" alt="votingboxChatButton" src={votingboxChat}></img></button>*/}
                    </div>
                    <div className="votingbox-container">
                        <div className="voting-list">
                            {players.map((message, index) => (
                                    <div className="voting-list-item" key={index} onClick={() => handleItemClick(index)}>
                                        <div className="voting-id" style={{color: message.color}}>
                                            <img src={`../src/images/Chat/chat_left_${message.color}.png`} alt="user"/><br/>
                                            {message.userId}
                                            <div>Votes: {votes[index]}</div>
                                            {activeIndex === index && (
                                                <div>
                                                    <button className="submitVote" onClick={() => handleSubmitClick(index) }><img src={submitVote}></img></button>
                                                    <button className="cancelVote" onClick={() => handleCancelClick(index) }><img src={cancelVote}></img></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className="skip-vote-button">
                        <button><img onClick={onButtonPress} src={ skipVote }></img></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Votingbox;
