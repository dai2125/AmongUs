import React, { useState, useEffect } from 'react';

const NumberButtonGame: React.FC = () => {
    const [buttonOrder, setButtonOrder] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [gameStarted, setGameStarted] = useState(false);

    // Function to shuffle array
    const shuffleArray = (array: number[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Function to start the game
    const startGame = () => {
        const shuffledOrder = shuffleArray([...Array(10).keys()].map(i => i + 1));
        setButtonOrder(shuffledOrder);
        setCurrentNumber(1);
        setGameStarted(true);
    };

    // Function to handle button click
    const handleButtonClick = (number: number) => {
        if (number === currentNumber) {
            setCurrentNumber(currentNumber! + 1);
        } else {
            // Reset the game if the wrong button is clicked
            setGameStarted(false);
            setCurrentNumber(null);
        }
    };

    // useEffect to start the game when component mounts
    useEffect(() => {
        startGame();
    }, []);

    return (
        <div>
            <h2>Number Button Game</h2>
            {!gameStarted && <button onClick={startGame}>Start Game</button>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    {buttonOrder.slice(0, 5).map((number, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(number)}
                            style={{
                                padding: '10px 20px',
                                margin: '0 5px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: currentNumber === number ? 'lightgreen' : 'inherit',
                                pointerEvents: gameStarted ? 'auto' : 'none', // Enable/disable button clicks based on game state
                            }}
                            disabled={currentNumber !== null && currentNumber !== number}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex' }}>
                    {buttonOrder.slice(5).map((number, index) => (
                        <button
                            key={index + 5}
                            onClick={() => handleButtonClick(number)}
                            style={{
                                padding: '10px 20px',
                                margin: '0 5px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: currentNumber === number ? 'lightgreen' : 'inherit',
                                pointerEvents: gameStarted ? 'auto' : 'none', // Enable/disable button clicks based on game state
                            }}
                            disabled={currentNumber !== null && currentNumber !== number}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NumberButtonGame;
