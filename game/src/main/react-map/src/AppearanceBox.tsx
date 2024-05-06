import React from 'react';
import blue from '../src/images/Characters/Blue.jpg';
import red from '../src/images/Characters/Red.jpg';
import green from '../src/images/Characters/Green.jpg';
import orange from '../src/images/Characters/Orange.jpg';
import yellow from '../src/images/Characters/Yellow.png';
import purple from '../src/images/Characters/Purple.jpg';
import brown from '../src/images/Characters/Brown.jpg';
import cyan from '../src/images/Characters/Cyan.jpg';
import lime from '../src/images/Characters/Lime.jpg';
import pink from '../src/images/Characters/Pink.jpg';
import white from '../src/images/Characters/White.jpg';
import black from '../src/images/Characters/Black.jpg';
import gray from '../src/images/Characters/Gray.jpg';

function AppearanceBox() {

    const [showBlue, setShowBlue] = React.useState<boolean>(false);
    const [showRed, setShowRed] = React.useState<boolean>(false);
    const [showGreen, setShowGreen] = React.useState<boolean>(false);
    const [showOrange, setShowOrange] = React.useState<boolean>(false);
    const [showYellow, setShowYellow] = React.useState<boolean>(false);
    const [showPurple, setShowPurple] = React.useState<boolean>(false);
    const [showBrown, setShowBrown] = React.useState<boolean>(false);
    const [showCyan, setShowCyan] = React.useState<boolean>(false);
    const [showLime, setShowLime] = React.useState<boolean>(false);
    const [showPink, setShowPink] = React.useState<boolean>(false);
    const [showBlack, setShowBlack] = React.useState<boolean>(false);
    const [showWhite, setShowWhite] = React.useState<boolean>(false);
    const [showGray, setShowGray] = React.useState<boolean>(false);


    const redButtonClicked = () => {
        setShowRed(true);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const orangeButtonClicked = () => {
        setShowOrange(true);
        setShowRed(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const yellowButtonClicked = () => {
        setShowYellow(true);
        setShowRed(false);
        setShowOrange(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const greenButtonClicked = () => {
        setShowGreen(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const cyanButtonClicked = () => {
        setShowCyan(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const blueButtonClicked = () => {
        setShowBlue(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const purpleButtonClicked = () => {
        setShowPurple(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const brownButtonClicked = () => {
        setShowBrown(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const grayButtonClicked = () => {
        setShowGray(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const limeButtonClicked = () => {
        setShowLime(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowPink(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const pinkButtonClicked = () => {
        setShowPink(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowBlack(false);
        setShowWhite(false);
    }

    const blackButtonClicked = () => {
        setShowBlack(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowWhite(false);
    }

    const whiteButtonClicked = () => {
        setShowWhite(true);
        setShowRed(false);
        setShowOrange(false);
        setShowYellow(false);
        setShowGreen(false);
        setShowCyan(false);
        setShowBlue(false);
        setShowPurple(false);
        setShowBrown(false);
        setShowGray(false);
        setShowLime(false);
        setShowPink(false);
        setShowBlack(false);
    }



    return (
        <div>
            <h2>Appearance</h2>
            <div>
                {showBlue   ? <img src={blue}   /> : <div></div>}
                {showRed    ? <img src={red}    /> : <div></div>}
                {showOrange ? <img src={orange} /> : <div></div>}
                {showYellow ? <img src={yellow} /> : <div></div>}
                {showGreen  ? <img src={green}  /> : <div></div>}
                {showCyan   ? <img src={cyan}   /> : <div></div>}
                {showPurple ? <img src={purple} /> : <div></div>}
                {showBrown  ? <img src={brown}  /> : <div></div>}
                {showGray   ? <img src={gray}   /> : <div></div>}
                {showLime   ? <img src={lime}   /> : <div></div>}
                {showPink   ? <img src={pink}   /> : <div></div>}
                {showBlack  ? <img src={black}  /> : <div></div>}
                {showWhite  ? <img src={white}  /> : <div></div>}

            </div>
            <button onClick={redButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'red',
                color: 'white',
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={orangeButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'orange',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={yellowButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'yellow',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={greenButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'green',
                color: 'white',

                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={cyanButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'cyan',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={blueButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={purpleButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'purple',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={brownButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'brown',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={grayButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={limeButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'lime',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={pinkButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'pink',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={blackButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}></button>
            <button onClick={whiteButtonClicked} style={{
                width: '25px',
                height: '50px',
                backgroundColor: 'white',
                color: 'white',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                border: 'none',
                cursor: 'pointer'
            }}></button>


        </div>
    );
}

export default AppearanceBox;