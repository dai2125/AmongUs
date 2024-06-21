import React, { useState } from 'react';
import DownloadMiniGame from "../DownloadMiniGame/DownloadMiniGame";

interface MiniGame1Props {
    onCompletion: (gameType: string) => void;
}
const GuessTheNumberMiniGame: React.FC<MiniGame1Props> = ({ onCompletion }) => {
    const [term, setTerm] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [secret] = useState(Math.floor(Math.random() * 100) + 1);
    const [highlight, setHighlight] = useState<'green' | 'red' | ''>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const guess = parseInt(term);
        if (isNaN(guess)) {
            setResultMessage('Please enter a valid number.');
            setHighlight('red');
        } else if (guess < secret) {
            setResultMessage('Higher!');
            setHighlight('green');
        } else if (guess > secret) {
            setResultMessage('Lower!');
            setHighlight('green');
        } else {
            setResultMessage('Congratulations! You guessed it!');
            setHighlight('green');
            setTimeout(() => onCompletion("Guess the number"), 500); // Pass the game type here
        }

        setTimeout(() => {
            setHighlight('');
        }, 500);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                <label htmlFor='term'>Guess Number between 1 to 100</label>
            </div>
            <input
                id='term'
                type='text'
                name='term'
                value={term}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '60%',
                    boxSizing: 'border-box'
                }}
            />
            <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
                Submit
            </button>
            <div style={{ marginTop: '10px', fontSize: '16px', color: resultMessage === 'Congratulations! You guessed it!' ? 'green' : highlight, transition: 'color 0.5s' }}>
                {resultMessage}
            </div>
        </div>
    );
}; export default GuessTheNumberMiniGame;
