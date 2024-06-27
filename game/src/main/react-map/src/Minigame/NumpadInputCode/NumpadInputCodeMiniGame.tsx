import React from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    startGame: boolean;
}

const questions = [
    {
        question: "What is the primary purpose of version control systems like Git?",
        answers: ["To manage changes to documents, programs, and other information",
            "To enhance the speed of the computer",
            "To clean the computer from viruses"],
        correct: "To manage changes to documents, programs, and other information"
    },
    {
        question: "What is a common software development methodology that focuses on iterative development and collaboration?",
        answers: ["Waterfall",
            "Agile",
            "Spiral"],
        correct: "Agile"
    },
    {
        question: "In software engineering, what design pattern describes an object that encapsulates how a set of objects interact?",
        answers: ["Singleton",
            "Mediator",
            "Decorator"],
        correct: "Mediator"
    },
];

const Modal: React.FC<{ onCompletion: (gameType: string) => void }> = ({onCompletion}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
    const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

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

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modal: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        closeButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
        },
        button: {
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#76c7c0',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        },
        questionText: {
            color: '#333',
            marginBottom: '20px',
            fontSize: '18px'
        },
        resultText: {
            color: '#76c7c0',
            fontSize: '18px',
            marginTop: '20px'
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={() => {
                    setIsVisible(false);
                    onCompletion("Answer the question");
                }}>X
                </button>
                <div>
                    <p style={{color: 'blue'}}>{question.question}</p>

                    {question.answers.map((answer, index) => (
                        <button key={index} onClick={() => handleAnswer(answer)} style={styles.button}>
                            {answer}
                        </button>
                    ))}
                    <p style={isCorrect ? styles.resultText : {...styles.resultText, color: 'red'}}>
                        {isCorrect !== null && (isCorrect ? 'Correct' : 'Incorrect')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
