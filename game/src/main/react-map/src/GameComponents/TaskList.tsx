import React, {useEffect, useState} from 'react';
import '../CSS/main.css';
import '../CSS/output.css';

const TaskList = ({role, tasks}) => {
    const [myRole, setMyRole] = useState("");
    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
        setMyRole(role);
        setMyTasks([
            tasks.task1,
            tasks.task2,
            tasks.task3
        ]);
    }, [tasks]);
/*
    style={{
        position: 'fixed',
            right: 10,
            bottom: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: '10px',

    }}
*/
    return (
        <div className="absolute bottom-1.5 left-2 w-100 h-100 bg-white bg-opacity-80 border  px-4 py-1"
             style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', zIndex: 1, borderRadius: '5px',}}>
            <div style={{
                flex: 1,
                minHeight: '100%',
                fontFamily: "'VCR OSD Mono', monospace"
            }}>
                <p className="text-black bold text-2xl">{myRole}</p>
                {myTasks.map((task, index) => (
                    <p key={index}>{task}</p>
                ))}
            </div>
            <div style={{
                marginLeft: 20,
                whiteSpace: 'nowrap',
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                fontFamily: "'VCR OSD Mono', monospace"
            }}>
                <p className="text-xl text-black">Tasks</p><br/>
            </div>
        </div>
    );
}

export default TaskList;
