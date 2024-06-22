import React, { useState, useEffect } from 'react';

interface MiniGame2Props {
    onCompletion: (gameType: string) => void;
}

const DownloadMiniGame: React.FC<MiniGame2Props> = ({ onCompletion }) => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const startDownload = () => {
        setIsDownloading(true);
        setIsComplete(false);
        setProgress(0);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isDownloading && progress < 100) {
            timer = setInterval(() => {
                setProgress(prev => {
                    const nextProgress = prev + 10;
                    if (nextProgress >= 100) {
                        clearInterval(timer);
                        setIsComplete(true);
                        setIsDownloading(false);
                        onCompletion("Download the file"); // Call the onCompletion prop when download is complete
                        return 100;
                    }
                    return nextProgress;
                });
            }, 500); // Adjust the interval speed as needed
        }
        return () => clearInterval(timer);
    }, [isDownloading, progress, onCompletion]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', margin: '20px 0', position: 'relative', height: '30px' }}>
                <div style={{
                    width: `${progress}%`,
                    backgroundColor: '#76c7c0',
                    borderRadius: '10px',
                    height: '100%',
                    transition: 'width 0.5s'
                }}></div>
            </div>
            {isComplete ? (
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4caf50' }}>Download Complete!</div>
            ) : (
                <button onClick={startDownload} disabled={isDownloading} style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: isDownloading ? '#a0a0a0' : '#76c7c0',
                    color: 'white',
                    transition: 'background-color 0.3s'
                }}>
                    {isDownloading ? 'Downloading...' : 'Start Download'}
                </button>
            )}
        </div>
    );
};

export default DownloadMiniGame;
