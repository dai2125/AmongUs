import React, { useState, useEffect } from 'react';

const cardImages = [
    '🐶', '🐱', '🐭', '🐹', '🐰',
    '🦊', '🐻', '🐼', '🐨', '🐯'
];

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const MiniGame5: React.FC<{ onCompletion: () => void }> = ({ onCompletion }) => {
    const [cards, setCards] = useState<string[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<boolean[]>([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const shuffledCards = shuffleArray([...cardImages, ...cardImages]);
        setCards(shuffledCards);
        setMatchedCards(new Array(shuffledCards.length).fill(false));
    }, []);

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2 || matchedCards[index]) return;

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
                const newMatchedCards = [...matchedCards];
                newMatchedCards[newFlippedCards[0]] = true;
                newMatchedCards[newFlippedCards[1]] = true;
                setMatchedCards(newMatchedCards);
                setFlippedCards([]);

                if (newMatchedCards.every(Boolean)) {
                    onCompletion();
                }
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.card,
                            ...(flippedCards.includes(index) || matchedCards[index] ? styles.cardFlipped : {})
                        }}
                        onClick={() => handleCardClick(index)}
                    >
                        {flippedCards.includes(index) || matchedCards[index] ? card : '❓'}
                    </div>
                ))}
            </div>
            <div style={styles.moves}>Moves: {moves}</div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
    } as React.CSSProperties,
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 80px)',
        gridGap: '10px',
    } as React.CSSProperties,
    card: {
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        border: '2px solid #cccccc',
        borderRadius: '10px',
        fontSize: '32px',
        cursor: 'pointer',
        transition: 'transform 0.3s',
    } as React.CSSProperties,
    cardFlipped: {
        transform: 'rotateY(180deg)',
        backgroundColor: '#76c7c0',
        color: 'white',
    } as React.CSSProperties,
    moves: {
        marginTop: '20px',
        fontSize: '18px',
    } as React.CSSProperties,
};

export default MiniGame5;
