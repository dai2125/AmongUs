import taskBar from "../src/images/Empty_task_bar.png"

const TaskBar = () => {

    return (
        <div>
            <img src={taskBar} style={{position: 'fixed', top: '50', left: '50', width: 'auto', height: 'auto'}}></img>
        </div>
    );
}

export default TaskBar;
