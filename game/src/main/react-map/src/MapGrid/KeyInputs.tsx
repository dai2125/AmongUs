import React, { useEffect } from 'react';

const KeyInput: React.FC<{ onKeyPress: (key: string) => void }> = ({ onKeyPress }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            switch (key) {
                case 'ArrowUp':
                    onKeyPress('ArrowUp');
                    break;
                case 'ArrowDown':
                    onKeyPress('ArrowDown');
                    break;
                case 'ArrowLeft':
                    onKeyPress('ArrowLeft');
                    break;
                case 'ArrowRight':
                    onKeyPress('ArrowRight');
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onKeyPress]); // Re-run effect when onKeyPress changes

    return null;
};

export default KeyInput;
