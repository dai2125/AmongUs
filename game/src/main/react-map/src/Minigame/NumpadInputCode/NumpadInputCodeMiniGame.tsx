import React, { useState } from 'react';

const generateRandomNumber = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const NumpadInputCodeMiniGame: React.FC<{ onCompletion: () => void }> = ({ onCompletion }) => {
    const [randomNumber, setRandomNumber] = useState<string>(generateRandomNumber());
    const [userInput, setUserInput] = useState<string>('');
    const [correctIndex, setCorrectIndex] = useState<number | null>(null);
    const [wrongPress, setWrongPress] = useState<boolean>(false);

    const handleButtonClick = (num: string, index: number) => {
        const newInput = userInput + num;
        if (randomNumber.startsWith(newInput)) {
            setUserInput(newInput);
            setCorrectIndex(index);
            setTimeout(() => setCorrectIndex(null), 500);
            if (newInput === randomNumber) {
                onCompletion();
            }
        } else {
            setUserInput('');
            setRandomNumber(generateRandomNumber());
            setWrongPress(true);
            setTimeout(() => setWrongPress(false), 500);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.prompt}>
                <p style={{
                    color:"black"
                }}>Follow this sequence:</p>
                <h1>{randomNumber}</h1>
            </div>
            <div style={styles.numpad}>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num, index) => (
                    <button
                        key={num}
                        style={{
                            ...styles.button,
                            ...(correctIndex === index ? styles.correctButton : {}),
                            ...(wrongPress ? styles.wrongButton : {})
                        }}
                        onClick={() => handleButtonClick(num.toString(), index)}
                    >
                        {num}
                    </button>
                ))}
                <button
                    style={{
                        ...styles.button,
                        ...(correctIndex === 9 ? styles.correctButton : {}),
                        ...(wrongPress ? styles.wrongButton : {})
                    }}
                    onClick={() => handleButtonClick('0', 9)}
                >
                    0
                </button>
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
    } as React.CSSProperties,
    correctButton: {
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        color: 'white'
    } as React.CSSProperties,
    wrongButton: {
        backgroundColor: '#f44336',
        borderColor: '#f44336',
        color: 'white'
    } as React.CSSProperties
};

export default NumpadInputCodeMiniGame;
