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
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// TODO Wrong name is displayed

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
    const [deadPlayer1, setDeadPlayer] = useState([]);
    const [countDown, setCountDown] = useState(30);

    // useEffect(() => {
    //     setPlayers([...otherPlayers.map(player => ({userId: player.userName, color: player.color}))]);
    //     setVotes(new Array(players.length).fill(0));
    // }, [players.length]);

    useEffect(() => {
        setPlayers([...otherPlayers.filter(player => player.getColor() !== 'dead').map(player => ({
            userId: player.userName,
            color: player.color
        }))]);
        setVotes(new Array(players.length).fill(0));
    }, [players.length, deadPlayer]);

    useEffect(() => {
        setDeadPlayer([...otherPlayers.filter(player => player.getColor() === 'dead').map(player => ({
            userId: player.userName
        }))]);
    }, []);

    useEffect(() => {
        const playerDetails = otherPlayers.map(player => ({
            userId: player.userName,
            color: player.getColor(),
            isDead: player.getColor() === 'dead'
        }));
        setPlayers(playerDetails);
        setVotes(new Array(playerDetails.length).fill(0));
    }, [otherPlayers]);

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
            setVotedFor(players[index].userId);
            console.log('VOTED FOR: ' + players[index].userId);
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
        // setVotingActive(false);
        setHasVoted(true);
        setVoteMessage("You skipped the vote, please wait.");
        onButtonPress(null);
    };

    const handleSubmitButtonPress = () => {
        // setVotingActive(false);
        setHasVoted(true);
        setVoteMessage("You submitted your vote, please wait.");
        onButtonPress(votedFor);
    };

    useEffect(() => {
        if(countDown === 0 && !hasVoted) {
            setVotingActive(false);
            setVoteMessage("Time is up, please wait.");
            onButtonPress(null);
        }
    }, [countDown]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/countdownVoting/', (message) => {
                const response = JSON.parse(message.body);

                console.log('COUNTDOWN: ' + response);
                setCountDown(response);
            });
        });
    }, []);

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
                        {/*<h2>{deadPlayer} is dead</h2>*/}
                        {/*<h2>{deadPlayer1}</h2>*/}
                        {deadPlayer1.length > 0 && (
                            <h2>{deadPlayer1.map(player => `${player.userId} is dead`).join(', ')}</h2>
                        )}
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
                    <div className="voting-countdown">
                        <h1>Time left: {countDown}</h1>
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
