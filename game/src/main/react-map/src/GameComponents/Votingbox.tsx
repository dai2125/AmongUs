import React, {useEffect, useState} from 'react';
import votingboxBackground from '../Images/Votingbox/Votingbox_background.png';
import skipVote from '../Images/Votingbox/Skip_vote.png';
import submitVote2 from '../Images/Votingbox/Submit_vote_2.png';
import submitVote from '../Images/Votingbox/submit_vote.png';
import cancelVote from '../Images/Votingbox/cancel_vote.png';

import '../CSS/Votingbox.css';
import VotingChatbox from "./VotingChatbox";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function Votingbox({onButtonPress, currentPlayer, otherPlayers, deadPlayer}) {

    const [votingVisible, setVotingVisible] = useState(false);
    const [players, setPlayers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedFor, setVotedFor] = useState('');
    const [votingActive, setVotingActive] = useState(true);
    const [voteMessage, setVoteMessage] = useState("Replace me");
    const [deadPlayer1, setDeadPlayer] = useState([]);
    const [countDown, setCountDown] = useState(30);

    useEffect(() => {
        setPlayers([...otherPlayers.filter(player => player.getColor() !== 'dead' && player.getColor() !== 'ghost').map(player => ({
            userId: player.userName,
            color: player.color
        }))]);
        setVotes(new Array(players.length).fill(0));
    }, [players.length, deadPlayer]);

    useEffect(() => {
        setDeadPlayer([...otherPlayers.filter(player => player.getColor() === 'dead' && player.getColor() === 'ghost').map(player => ({
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
            setVoteMessage("You submitted your vote, please wait.");
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
        setVotedFor("null");
    }

    const handleSkipButtonPress = () => {
        setVotingActive(false);
        setHasVoted(true);
        setVoteMessage("You skipped the vote, please wait.");
        onButtonPress("null");
    };

    const handleSubmitButtonPress = () => {
        setVotingActive(false);
        setHasVoted(true);
        setVoteMessage("You submitted your vote, please wait.");
        onButtonPress(votedFor);
    };

    useEffect(() => {
        if (countDown === 0 && !hasVoted) {
            setVotingActive(false);
            setVoteMessage("Time is up, please wait.");

            setTimeout(() => {
                onButtonPress("null");
            }, 3000);
        }

    }, [countDown]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/countdownVoting/', (message) => {
                const response = JSON.parse(message.body);

                setCountDown(response);
            });
        });

        return () => {
            client.disconnect(() => {
            });
        }

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
                        {deadPlayer1.length > 0 && (
                            <h2 className="voting-h2">{deadPlayer1.map(player => `${player.userId} is dead`).join(', ')}</h2>
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
                    <div className="row-span-4 grid grid-cols-3 gap-4 h-1/6 justify-self-center">
                        <div className="skip-vote-button">
                            <button onClick={handleSkipButtonPress}><img src={skipVote}></img></button>
                        </div>
                        <div className="submit-vote-button">
                            <button onClick={handleSubmitButtonPress}><img src={submitVote2}></img></button>
                        </div>
                        <div className="voting-countdown">
                            <h1>Time left: {countDown}</h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="voting-h2" style={{
                        fontFamily: 'bold 30px 14px VCR OSD Mono monospace',
                        fontSize: '20px',
                        color: 'white'
                    }}>{voteMessage}</h2>
                </div>
            )}
        </div>
    )
}

export default Votingbox;
