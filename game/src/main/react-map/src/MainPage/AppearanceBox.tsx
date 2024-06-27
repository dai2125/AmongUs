import React, {useState} from 'react';
import '../CSS/rainbowButton.css';
import red from '../Images/Characters/red.jpg';
import blue from '../Images/Characters/Blue.jpg';
import cyan from '../Images/Characters/Cyan.jpg';
import lime from '../Images/Characters/Lime.jpg';
import pink from '../Images/Characters/Pink.jpg';
import green from '../Images/Characters/Green.jpg';
import brown from '../Images/Characters/Brown.jpg';
import white from '../Images/Characters/White.jpg';
import black from '../Images/Characters/Black.jpg';
import orange from '../Images/Characters/Orange.jpg';
import yellow from '../Images/Characters/Yellow.png';
import purple from '../Images/Characters/Purple.jpg';

const AppearanceBox = ({setUserColor}) => {

    const [color, setColor] = useState('red')

    const [showRed, setShowRed] = React.useState<boolean>(true);
    const [showBlue, setShowBlue] = React.useState<boolean>(false);
    const [showCyan, setShowCyan] = React.useState<boolean>(false);
    // const [showGray, setShowGray] = React.useState<boolean>(false);
    const [showPink, setShowPink] = React.useState<boolean>(false);
    const [showLime, setShowLime] = React.useState<boolean>(false);
    const [showGreen, setShowGreen] = React.useState<boolean>(false);
    const [showBlack, setShowBlack] = React.useState<boolean>(false);
    const [showWhite, setShowWhite] = React.useState<boolean>(false);
    const [showBrown, setShowBrown] = React.useState<boolean>(false);
    const [showOrange, setShowOrange] = React.useState<boolean>(false);
    const [showYellow, setShowYellow] = React.useState<boolean>(false);
    const [showPurple, setShowPurple] = React.useState<boolean>(false);

    const redButtonClicked = () => {
        setUserColor('red');
        setColor('red');
        setShowRed(true);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBrown(false);
        setShowGreen(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const orangeButtonClicked = () => {
        setUserColor('orange');
        setColor('orange');
        setShowOrange(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowGreen(false);
        setShowBrown(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowPurple(false);
        setShowYellow(false);
    }

    const yellowButtonClicked = () => {
        setUserColor('yellow');
        setColor('yellow');
        setShowYellow(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowGreen(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowBrown(false);
        setShowOrange(false);
        setShowPurple(false);
    }

    const greenButtonClicked = () => {
        setUserColor('green');
        setColor('green');
        setShowGreen(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowBrown(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const cyanButtonClicked = () => {
        setUserColor('cyan');
        setColor('cyan');
        setShowCyan(true);
        setShowRed(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowGreen(false);
        setShowBrown(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const blueButtonClicked = () => {
        setUserColor('blue');
        setColor('blue');
        setShowBlue(true);
        setShowRed(false);
        setShowCyan(false);
        setShowLime(false);
        setShowPink(false);
        setShowBrown(false);
        setShowGreen(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const purpleButtonClicked = () => {
        setColor('purple');
        setUserColor('purple');
        setShowPurple(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowGreen(false);
        setShowBrown(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowOrange(false);
    }

    const brownButtonClicked = () => {
        setUserColor('brown');
        setColor('brown');
        setShowBrown(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowGreen(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const limeButtonClicked = () => {
        setUserColor('lime');
        setColor('lime');
        setShowLime(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPink(false);
        setShowGreen(false);
        setShowBrown(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowPurple(false);
    }

    const pinkButtonClicked = () => {
        setUserColor('pink');
        setColor('pink');
        setShowPink(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowGreen(false);
        setShowBlack(false);
        setShowBrown(false);
        setShowWhite(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const blackButtonClicked = () => {
        setUserColor('black');
        setColor('black');
        setShowBlack(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowGreen(false);
        setShowBrown(false);
        setShowWhite(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowPurple(false);
    }

    const whiteButtonClicked = () => {
        setUserColor('white');
        setColor('white');
        setShowWhite(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowGreen(false);
        setShowBlack(false);
        setShowBrown(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowPurple(false);
    }

    return (
        <div>
            <div className="character-image">
                {showRed ? <img src={red}/> : <div></div>}
                {showBlue ? <img src={blue}/> : <div></div>}
                {showCyan ? <img src={cyan}/> : <div></div>}
                {showLime ? <img src={lime}/> : <div></div>}
                {showPink ? <img src={pink}/> : <div></div>}
                {showGreen ? <img src={green}/> : <div></div>}
                {showBlack ? <img src={black}/> : <div></div>}
                {showWhite ? <img src={white}/> : <div></div>}
                {showBrown ? <img src={brown}/> : <div></div>}
                {showOrange ? <img src={orange}/> : <div></div>}
                {showYellow ? <img src={yellow}/> : <div></div>}
                {showPurple ? <img src={purple}/> : <div></div>}

            </div>
            <div className="button-box">
                <button className="red-button" onClick={redButtonClicked}></button>
                <button className="cyan-button" onClick={cyanButtonClicked}></button>
                <button className="blue-button" onClick={blueButtonClicked}></button>
                <button className="lime-button" onClick={limeButtonClicked}></button>
                <button className="pink-button" onClick={pinkButtonClicked}></button>
                <button className="brown-button" onClick={brownButtonClicked}></button>
                <button className="green-button" onClick={greenButtonClicked}></button>
                <button className="black-button" onClick={blackButtonClicked}></button>
                <button className="white-button" onClick={whiteButtonClicked}></button>
                <button className="yellow-button" onClick={yellowButtonClicked}></button>
                <button className="purple-button" onClick={purpleButtonClicked}></button>
                <button className="orange-button" onClick={orangeButtonClicked}></button>
            </div>
        </div>
    );
}

export default AppearanceBox;
