import emptyTaskBar from "../src/images/Empty_task_bar.png"
import oneOfNineTaskBar from "../src/images/One_of_Nine_task_bar.png";
import twoOfNineTaskBar from "../src/images/Two_of_Nine_task_bar.png";
import sixOfNineTaskBar from "../src/images/Six_of_Nine_task_bar.png";
import fourOfNineTaskBar from "../src/images/Four_of_Nine_task_bar.png";
import fiveOfNineTaskBar from "../src/images/Five_of_Nine_task_bar.png";
import nineOfNineTaskBar from "../src/images/Nine_of_Nine_task_bar.png";
import threeOfNineTaskBar from "../src/images/Three_of_Nine_task_bar.png";
import eightOfNineTaskBar from "../src/images/Eight_of_Nine_task_bar.png";
import sevenOfNineTaskBar from "../src/images/Seven_of_Nine_task_bar.png";

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
