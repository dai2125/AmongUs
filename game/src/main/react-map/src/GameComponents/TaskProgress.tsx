import React, { useState, useEffect } from 'react';

interface MiniGame2Props {
    percentage: number;
}

const TaskProgress: React.FC<MiniGame2Props> = ({ percentage }) => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        setProgress(percentage);
    }, [percentage]);

    return (
        <div style={{ textAlign: 'center'}}>
            <div>
                <p className="ml-3 text-white" style={{ fontSize: '30px' }}>Task Progress</p>
            </div>
            <div style={{
                width: '800px',
                borderRadius: '5px',border: '1px solid white', margin: '20px 0', position: 'relative', height: '40px', marginBottom:'10' }}>
                <div style={{
                    width: `${progress}%`,
                    backgroundColor: '#7FFF00',
                    borderRadius: '5px',
                    height: '100%',
                    transition: 'width 0.5s'
                }}></div>
            </div>
        </div>
    );
};

export default TaskProgress;
