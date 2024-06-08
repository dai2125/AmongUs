import React, {useEffect, useState} from 'react';
import votingboxBackground from '../Images/Votingbox/Votingbox_background.png';
import votingboxButton from '../Images/Buttons/Report_Button.jpg';
import votingboxChat from '../Images/Buttons/chat_button.png';
import skipVote from '../Images/Votingbox/Skip_vote.png';
import submitVote from '../Images/Votingbox/submit_vote.png';
import cancelVote from '../Images/Votingbox/cancel_vote.png';

import '../CSS/Votingbox.css';
import VotingChatbox from "./VotingChatbox";
import {Player} from "../Player";

// TODO Backend erstellen
// TODO Backend muss die Votes übernehmen
// TODO fertig designen

interface Props {
    onButtonPress: (userId: string) => void;
    currentPlayer: Player;
    otherPlayers: Player[];
}

function Votingbox ({ onButtonPress, currentPlayer, otherPlayers, deadPlayer})  {

    const [votingVisible, setVotingVisible] = useState(false);
    const [players, setPlayers] = useState([]);
    // const [showVotingChatbox, setShowVotingChatbox] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedFor, setVotedFor] = useState(null);
    const [votingActive, setVotingActive] = useState(true);
    const [voteMessage, setVoteMessage] = useState("");

    // useEffect(() => {
    //     setPlayers([...otherPlayers.map(player => ({userId: player.userName, color: player.color}))]);
    //     setVotes(new Array(players.length).fill(0));
    // }, [players.length]);

    useEffect(() => {
        setPlayers([...otherPlayers.filter(player => player.getUserName() !== deadPlayer).map(player => ({
            userId: player.userName,
            color: player.color
        }))]);
        setVotes(new Array(players.length).fill(0));
    }, [players.length, deadPlayer]);

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
            // onButtonPress(players[index].userId);
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
        setVotedFor(null);
    }

    const handleSkipButtonPress = () => {
        setVotingActive(false);
        setVoteMessage("You skipped the vote, please wait.");
        onButtonPress(null);
    };

    const handleSubmitButtonPress = () => {
        setVotingActive(false);
        setVoteMessage("You submitted your vote, please wait.");
        onButtonPress(votedFor);
    };


    return (
        <div className="votingbox" style={{backgroundImage: `url(${votingboxBackground}`}}>
            {votingActive ? (
                <div>
                    <div className="votingbox-header">
                        <div></div>
                        <h1>Who Is The Impostor?</h1>
                        <VotingChatbox playerColor={currentPlayer.color}
                                       playerName={currentPlayer.userName}></VotingChatbox>
                        {/*<button><img className="votingboxChatButton" alt="votingboxChatButton" src={votingboxChat}></img></button>*/}
                        <h2>{deadPlayer} is dead</h2>
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
                                                <button className="submitVote" onClick={() => handleSubmitClick(index)}>
                                                    <img
                                                        src={submitVote}></img></button>
                                                <button className="cancelVote" onClick={() => handleCancelClick(index)}>
                                                    <img
                                                        src={cancelVote}></img></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="skip-vote-button">
                        <button onClick={handleSkipButtonPress}><img src={skipVote}></img></button>
                    </div>
                    <div className="submit-vote-button">
                        <button onClick={handleSubmitButtonPress}>Submit Button</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>{voteMessage}</h1>
                </div>
            )}
        </div>
    )

}

export default Votingbox;
