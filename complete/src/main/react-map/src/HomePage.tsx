import React from 'react';
import './main.css'
import './output.css';
import {User} from "./User";

type Props ={
    loggedInUser:User;
    onPlayButtonClick(): void;
}

export default function HomePage({onPlayButtonClick, loggedInUser}: Props) {
    const user = loggedInUser;

    return (
        <div className="background grid grid-rows-12 h-screen w-screen p-10">
            <div className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2">
                <div id="user-div" className="col-span-1"></div>
                <div className="col-span-1 text-3xl text-cyan-500 text-center">{user.getUsername()}</div>
            </div>

            <div className="grid row-span-10 grid-cols-3 mb-5 gap-2">
                <div className="grid rows-8 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 col-span-1 w-full h-full justify-self-end">
                    <div className="row-span-1">
                        <p className="text-5xl text-center font-light text-amber-600 underline">AMOMUS</p>
                    </div>
                    <div className="p-4 grid grid-rows-3 row-span-7 border-double rounded-lg border-2 border-fuchsia-800 w-11/12 h-5/6 justify-self-center align-items-center">
                        <button className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="text-3xl">Home</b>
                        </button>
                        <button onClick={onPlayButtonClick} className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="text-3xl">PLAY</b>
                        </button>
                        <button className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="text-3xl">ACCOUNT</b>
                        </button>
                        {/* Wiederhole für die anderen Buttons */}
                    </div>
                </div>

                {/* Zweite Hauptspalte */}
                <div className="bg-transparent border-double rounded-lg border-2 border-teal-400 col-span-2 w-full justify-self-start p-4">
                    {/* Inhalt der zweiten Spalte */}
                </div>
            </div>
        </div>
    );
}
