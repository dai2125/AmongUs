import React, { useEffect } from 'react';

const KeyInput: React.FC<{ onKeyPress: (key: string) => void }> = ({ onKeyPress }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            switch (key) {
                case 'ArrowUp':
                    onKeyPress(key);
                    break;
                case 'ArrowDown':
                    onKeyPress(key);
                    break;
                case 'ArrowLeft':
                    onKeyPress(key);
                    break;
                case 'ArrowRight':
                    onKeyPress(key);
                    break;
                case 'space':
                    onKeyPress(key);
                    break;
                case 'w':
                    onKeyPress(key);
                    break;
                case 'e':
                    onKeyPress(key);
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
