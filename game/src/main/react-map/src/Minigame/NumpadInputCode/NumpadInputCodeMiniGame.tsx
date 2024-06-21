import React from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    startGame: boolean;
}

const questions = [
    { question: "What is the primary purpose of version control systems like Git?", answers: ["To manage changes to documents, programs, and other information", "To enhance the speed of the computer", "To clean the computer from viruses"], correct: "To manage changes to documents, programs, and other information" },
    { question: "What is a common software development methodology that focuses on iterative development and collaboration?", answers: ["Waterfall", "Agile", "Spiral"], correct: "Agile" },
    { question: "In software engineering, what design pattern describes an object that encapsulates how a set of objects interact?", answers: ["Singleton", "Mediator", "Decorator"], correct: "Mediator" },
];

const Modal: React.FC<{ onCompletion: (gameType: string) => void }> = ({ onCompletion }) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
    const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

    // Funktion zum Zufälligen Auswählen einer Frage beim ersten Rendern
    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(randomIndex);
    }, []);

    const handleAnswer = (answer: string) => {
        const correct = questions[currentQuestion].correct === answer;
        setIsCorrect(correct);
        if (correct) {
            setTimeout(() => {
                setIsVisible(false);
                onCompletion("Answer the question");
            }, 1000);
        }
    };

    if (!isVisible) {
        return null;
    }

    const question = questions[currentQuestion];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={() => {
                    setIsVisible(false);
                    onCompletion("Answer the question");
                }}>X</button>
                <div>
                    <p style={{ color: 'blue' }}>{question.question}</p>
                    {question.answers.map((answer, index) => (
                        <button key={index} onClick={() => handleAnswer(answer)}>{answer}<pre></pre></button>
                    ))}
                    {isCorrect !== null && <p style={{ color: 'blue' }}>{isCorrect ? '++' : '--'}</p>}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    } as React.CSSProperties,
    modal: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative'
    } as React.CSSProperties,
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer'
    } as React.CSSProperties
};

export default Modal;
