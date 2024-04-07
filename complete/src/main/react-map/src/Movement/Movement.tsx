import React, { useEffect } from 'react';
import {useStompClient} from "react-stomp-hooks";
import sendMovement from "../KeyInputs/KeyInputs";
import userId from "../KeyInputs/KeyInputs";

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

interface MovementProps {
    onMove: (direction: Direction) => void;
}

// const Movement: React.FC<MovementProps> = ({ onMove }) => {
//     useEffect(() => {
//         const handleKeyDown = (event: KeyboardEvent) => {
//             switch (event.key) {
//                 case 'ArrowUp':
//                     console.log('ArrowUp');
//                 case 'ArrowDown':
//                 case 'ArrowLeft':
//                 case 'ArrowRight':
//                     onMove(event.key as Direction);
//                     sendMovement(event.key, userId);
//                     console.log('Movement:', event.key, + ' userId ', userId);
//                     useStompClient().send('/app/movement/{userId}', {}, event.key);
                    // break;
                // default:
                //     break;
            // }
        // };
        //
        // window.addEventListener('keydown', handleKeyDown);
        //
        // return () => {
        //     window.removeEventListener('keydown', handleKeyDown);
        // };
    // }, [onMove]);
    //
    // return null;
// }
//
// export default Movement;
