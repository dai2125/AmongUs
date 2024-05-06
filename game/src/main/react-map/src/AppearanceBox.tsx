import React from 'react';
import '../src/CSS/rainbowButton.css';
import red from './images/Characters/red.jpg';
import blue from '../src/images/Characters/Blue.jpg';
import cyan from '../src/images/Characters/Cyan.jpg';
import lime from '../src/images/Characters/Lime.jpg';
import pink from '../src/images/Characters/Pink.jpg';
import gray from '../src/images/Characters/Gray.jpg';
import green from '../src/images/Characters/Green.jpg';
import brown from '../src/images/Characters/Brown.jpg';
import white from '../src/images/Characters/White.jpg';
import black from '../src/images/Characters/Black.jpg';
import orange from '../src/images/Characters/Orange.jpg';
import yellow from '../src/images/Characters/Yellow.png';
import purple from '../src/images/Characters/Purple.jpg';

function AppearanceBox() {

    const [showRed, setShowRed] = React.useState<boolean>(false);
    const [showBlue, setShowBlue] = React.useState<boolean>(false);
    const [showCyan, setShowCyan] = React.useState<boolean>(false);
    const [showGray, setShowGray] = React.useState<boolean>(false);
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
        setShowRed(true);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowOrange(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowYellow(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowGreen(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowCyan(true);
        setShowRed(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowBlue(true);
        setShowRed(false);
        setShowCyan(false);
        setShowGray(false);
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
        setShowPurple(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowBrown(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
        setShowGreen(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const grayButtonClicked = () => {
        setShowGray(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowGreen(false);
        setShowWhite(false);
        setShowBrown(false);
        setShowYellow(false);
        setShowPurple(false);
        setShowOrange(false);
    }

    const limeButtonClicked = () => {
        setShowLime(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowPink(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowBlack(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
        setShowWhite(true);
        setShowRed(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowGray(false);
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
                {showRed ? <img src={red} /> : <div></div>}
                {showBlue ? <img src={blue} /> : <div></div>}
                {showCyan ? <img src={cyan} /> : <div></div>}
                {showGray ? <img src={gray} /> : <div></div>}
                {showLime ? <img src={lime} /> : <div></div>}
                {showPink ? <img src={pink} /> : <div></div>}
                {showGreen ? <img src={green} /> : <div></div>}
                {showBlack ? <img src={black} /> : <div></div>}
                {showWhite ? <img src={white} /> : <div></div>}
                {showBrown ? <img src={brown} /> : <div></div>}
                {showOrange ? <img src={orange} /> : <div></div>}
                {showYellow ? <img src={yellow} /> : <div></div>}
                {showPurple ? <img src={purple} /> : <div></div>}

            </div>
            <div className="button-box">
                <button className="red-button"      onClick={redButtonClicked}      ></button>
                <button className="orange-button"   onClick={orangeButtonClicked}   ></button>
                <button className="yellow-button"   onClick={yellowButtonClicked}   ></button>
                <button className="green-button"    onClick={greenButtonClicked}    ></button>
                <button className="cyan-button"     onClick={cyanButtonClicked}     ></button>
                <button className="blue-button"     onClick={blueButtonClicked}     ></button>
                <button className="purple-button"   onClick={purpleButtonClicked}   ></button>
                <button className="brown-button"    onClick={brownButtonClicked}    ></button>
                <button className="gray-button"     onClick={grayButtonClicked}     ></button>
                <button className="lime-button"     onClick={limeButtonClicked}     ></button>
                <button className="pink-button"     onClick={pinkButtonClicked}     ></button>
                <button className="black-button"    onClick={blackButtonClicked}    ></button>
                <button className="white-button"    onClick={whiteButtonClicked}    ></button>
            </div>
        </div>
    );
}

export default AppearanceBox;