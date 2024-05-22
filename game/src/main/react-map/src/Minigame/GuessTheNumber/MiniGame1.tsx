import React, { useState } from 'react';

interface MiniGame1Props {
    onCompletion: () => void;
}

const MiniGame1: React.FC<MiniGame1Props> = ({ onCompletion }) => {
    const [term, setTerm] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [secret] = useState(Math.floor(Math.random() * 100) + 1);

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
        } else if (guess < secret) {
            setResultMessage('Higher!');
        } else if (guess > secret) {
            setResultMessage('Lower!');
        } else {
            setResultMessage('Congratulations! You guessed it!');
            onCompletion();
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor='term'>Guess Number between 1 to 100</label>
            </div>
            <input
                id='term'
                type='text'
                name='term'
                value={term}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                style={{ padding: '5px', fontSize: '16px' }}
            />
            <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '16px' }}>
                Submit
            </button>
            <div style={{ marginTop: '10px', fontSize: '16px' }}>
                {resultMessage}
            </div>
        </div>
    );
};

export default MiniGame1;
