import emptyTaskBar from "../Images/Taskbar/Empty_task_bar.png"
import oneOfNineTaskBar from "../Images/Taskbar/One_of_Nine_task_bar.png";
import twoOfNineTaskBar from "../Images/Taskbar/Two_of_Nine_task_bar.png";
import sixOfNineTaskBar from "../Images/Taskbar/Six_of_Nine_task_bar.png";
import fourOfNineTaskBar from "../Images/Taskbar/Four_of_Nine_task_bar.png";
import fiveOfNineTaskBar from "../Images/Taskbar/Five_of_Nine_task_bar.png";
import nineOfNineTaskBar from "../Images/Taskbar/Nine_of_Nine_task_bar.png";
import threeOfNineTaskBar from "../Images/Taskbar/Three_of_Nine_task_bar.png";
import eightOfNineTaskBar from "../Images/Taskbar/Eight_of_Nine_task_bar.png";
import sevenOfNineTaskBar from "../Images/Taskbar/Seven_of_Nine_task_bar.png";

interface TaskBarProps {
    completedTasksCount: number;
}

const TaskBar: React.FC<TaskBarProps> = ({completedTasksCount}) => {
    let imageSrc;
    switch (completedTasksCount) {
        case 0:
            imageSrc = emptyTaskBar;
            break;
        case 1:
            imageSrc = oneOfNineTaskBar;
            break;
        case 2:
            imageSrc = twoOfNineTaskBar;
            break;
        case 3:
            imageSrc = threeOfNineTaskBar;
            break;
        case 4:
            imageSrc = fourOfNineTaskBar;
            break;
        case 5:
            imageSrc = fiveOfNineTaskBar;
            break;
        case 6:
            imageSrc = sixOfNineTaskBar;
            break;
        case 7:
            imageSrc = sevenOfNineTaskBar;
            break;
        case 8:
            imageSrc = eightOfNineTaskBar;
            break;
        case 9:
            imageSrc = nineOfNineTaskBar;
            break;
        default:
            imageSrc = nineOfNineTaskBar;
            break;
    }

    return (
        <div>
            <img src={imageSrc} style={{position: 'fixed', top: '50', left: '50', width: 'auto', height: 'auto'}}></img>
        </div>
    );
}

export default TaskBar;
