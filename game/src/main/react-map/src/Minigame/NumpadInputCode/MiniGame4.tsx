import React, { useState } from 'react';

const generateRandomNumber = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const MiniGame4: React.FC<{ onCompletion: () => void }> = ({ onCompletion }) => {
    const [randomNumber, setRandomNumber] = useState<string>(generateRandomNumber());
    const [userInput, setUserInput] = useState<string>('');

    const handleButtonClick = (num: string) => {
        const newInput = userInput + num;
        if (randomNumber.startsWith(newInput)) {
            setUserInput(newInput);
            if (newInput === randomNumber) {
                onCompletion();
            }
        } else {
            setUserInput('');
            setRandomNumber(generateRandomNumber());
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.prompt}>
                <p style={{
                    color:'black'
                }}>Follow this sequence:</p>
                <h1>{randomNumber}</h1>
            </div>
            <div style={styles.numpad}>
                {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                    <button key={num} style={styles.button} onClick={() => handleButtonClick(num.toString())}>
                        {num}
                    </button>
                ))}
                <button style={styles.button} onClick={() => handleButtonClick('0')}>0</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif'
    } as React.CSSProperties,
    prompt: {
        marginBottom: '20px',
        textAlign: 'center'
    } as React.CSSProperties,
    numpad: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gridGap: '10px'
    } as React.CSSProperties,
    button: {
        width: '80px',
        height: '80px',
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        border: '2px solid #cccccc',
        borderRadius: '8px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s'
    } as React.CSSProperties
};

export default MiniGame4;
