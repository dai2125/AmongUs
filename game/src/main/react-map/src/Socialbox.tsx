import './CSS/main.css';
import './CSS/output.css';

import addFriend from '../src/Add_Friend.png';

export function Socialbox() {
    return (
        <div className="socialbox">
            <div className="socialbox-header">
                <h2>Connect with Friends</h2>
            </div>
            <div>
                <button><img src={addFriend}></img></button>
            </div>
        </div>
    )
}

export default Socialbox;
