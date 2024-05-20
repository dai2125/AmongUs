import React, { useState } from 'react';
import './MiniGame1.module.css';

const MiniGame1: React.FC = () => {
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
        }
    };

    return (
        <div className='container'>
            <div className='head'>
                <label htmlFor='term'>Guess Number between 1 to 100</label>
            </div>
            <input
                id='term'
                type='text'
                name='term'
                value={term}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSubmit}>Submit</button>
            <div className='result'>
                {resultMessage}
            </div>
        </div>
    );
};

export default MiniGame1;
