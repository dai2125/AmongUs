import React from 'react';

interface WaitingMessageProps {
    // Hier können bei Bedarf weitere Props definiert werden
}

const WaitingMessage: React.FC<WaitingMessageProps> = () => {
    return (
        <div>
            <p>Waiting for others</p>
        </div>
    );
}

export default WaitingMessage;
