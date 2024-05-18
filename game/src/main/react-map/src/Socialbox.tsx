import './CSS/main.css';
import './CSS/output.css';

import socialBoxBackground from '../../resources/images/socialbox_background.png';
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
            {/*<div className="socialbox-body">*/}
            {/*    <div className="socialbox-body-content">*/}
            {/*        <div className="socialbox-body-content-item">*/}
            {/*            <img src="https://via.placeholder.com/150" alt="profile" />*/}
            {/*            <h3>John Doe</h3>*/}
            {/*            <button>Follow</button>*/}
            {/*        </div>*/}
            {/*        <div className="socialbox-body-content-item">*/}
            {/*            <img src="https://via.placeholder.com/150" alt="profile" />*/}
            {/*            <h3>Jane Doe</h3>*/}
            {/*            <button>Follow</button>*/}
            {/*        </div>*/}
            {/*        <div className="socialbox-body-content-item">*/}
            {/*            <img src="https://via.placeholder.com/150" alt="profile" />*/}
            {/*            <h3>John Smith</h3>*/}
            {/*            <button>Follow</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Socialbox;
