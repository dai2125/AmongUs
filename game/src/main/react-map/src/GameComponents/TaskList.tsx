import React, { useEffect, useState } from 'react';
import '../CSS/main.css';
import '../CSS/output.css';

interface Props {
    tasks: {
        task1: string;
        task2: string;
        task3: string;
    };
}

const TaskList = ({tasks}) => {

    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
        setMyTasks([
            tasks.task1,
            tasks.task2,
            tasks.task3
        ]);
    }, []);

    // return (
    //     <div>
    //         <h1>Tasks</h1>
    //         <ul>
    //             <li>{tasks.task1}</li>
    //             <li>{tasks.task2}</li>
    //             <li>{tasks.task3}</li>
    //         </ul>
    //     </div>
    // )
    // const [myTasks, setMyTasks] = useState([]);

    // useEffect(() => {
    //     setMyTasks([
    //         'Storage: Fix Wiring (0/3)',
    //         'Upper Engine: Align Engine Output (0/2)',
    //         'Electrical: Divert Power to Weapons (0/2)',
    //         'Navigation: Download Data (0/2)'
    //     ]);
    // }, []);

    return (
        <div className="absolute top-32 left-1 w-100 h-100 bg-white bg-opacity-80 border  px-4 py-1"
             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center'}}>
             <div style={{ flex: 1, minHeight: '100%', borderRight: '1px solid #ccc' }}>
                 {myTasks.map((task, index) => (
                     <p key={index}>{task}</p>
                 ))}
             </div>
             <div style={{ marginLeft: 20, whiteSpace: 'nowrap', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                 <h1>Tasks</h1>
             </div>
         </div>
     );
}

export default TaskList;
