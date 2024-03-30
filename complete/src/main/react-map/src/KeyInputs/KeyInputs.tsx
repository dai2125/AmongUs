import React, { useEffect } from 'react';

const WebSocketClient: React.FC = () => {
    useEffect(() => {
        // Create WebSocket connection
        const socket = new WebSocket('ws://localhost:8080/gs-guide-websocket');

        // Connection opened
        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server');

            // Send identification message with ID to the server
            const id = 'your_id_here'; // Replace 'your_id_here' with the actual ID
            socket.send(JSON.stringify({ type: 'subscribe', id }));
        });

        // Listen for messages
        socket.addEventListener('message', (event) => {
            console.log('Received message:', event.data);
        });

        // Function to send key inputs to server
        const sendKeyInputToServer = (input: string) => {
            // Send key input as string to server
            socket.send(input);
        };

        // Event listener for key presses
        const handleKeyPress = (event: KeyboardEvent) => {
            // Send key input to server when key is pressed
            sendKeyInputToServer(event.key);
        };

        // Add event listener for key presses
        window.addEventListener('keypress', handleKeyPress);

        // Cleanup function
        return () => {
            // Close WebSocket connection when component unmounts
            socket.close();
            console.log('Disconnected from WebSocket server');
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return <div></div>;
};

export default WebSocketClient;
