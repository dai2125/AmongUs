import React, { useEffect, useState } from 'react';
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

    return (
        <div className="absolute top-36 left-1 w-100 h-100 bg-white bg-opacity-80 border  px-4 py-1"
             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', zIndex: 1}}>
            <div style={{flex: 1, minHeight: '100%', borderRight: '1px solid #ccc', fontFamily: "'VCR OSD Mono', monospace"}}>
                <p className="text-black bold text-xl">{myRole}</p>
                {myTasks.map((task, index) => (
                    <p key={index}>{task}</p>
                ))}
            </div>
            <div style={{ marginLeft: 20, whiteSpace: 'nowrap', writingMode: 'vertical-lr', transform: 'rotate(180deg)', fontFamily: "'VCR OSD Mono', monospace"}}>
                 <h1>Tasks</h1><br/>
             </div>
         </div>
     );
}

export default TaskList;
