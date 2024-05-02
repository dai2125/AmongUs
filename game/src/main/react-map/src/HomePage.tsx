import React, {FormEvent, useState} from 'react';
import './main.css'
import './output.css';
import {User} from "./User";
// import Socialbox from "./Socialbox";
import chatButton from '../../resources/images/chat_button.png';
// import image from '../ressources/images/chat_button.png';

type Props ={
    loggesInUser: User;
    onPlayButtonClick(): void;
}

export default function HomePage({loggesInUser, onPlayButtonClick}: Props) {

    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showSocialBox, setShowSocialBox] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");
    const [successMessage , setSuccessMessage] = useState("");

    const handleMyAccount = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const user = {
            oldName: loggesInUser.getUsername(),
            oldPassword: loggesInUser.getPassword(),
            newName: data.get('newUsername') as string,
            newEmail: data.get('newEmail') as string,
            oldPasswordInput: data.get('oldPassword') as string,
            newPassword: data.get('newPassword') as string,
            passwordConfirm: data.get('newPasswordConfirm') as string,
        }

        const passwordRegex = /^.{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(user.newEmail)
            && (passwordRegex.test(user.newPassword))
            && (user.newPassword == user.passwordConfirm)
            &&(user.oldPassword == user.oldPasswordInput))
        {fetch('http://localhost:8080/accountDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((data) => {
                if (data.status === 200) {
                    setSuccessMessage("Account Changed Successfully");
                    setErrorMessage("");
                    // alert("Account Created Successfully");
                    loggesInUser.setUsername(user.newName);
                    loggesInUser.setPassword(user.newPassword);

                } else if(data.status == 400){
                    setErrorMessage("Email is already taken");
                    setSuccessMessage("");
                } else {
                    setErrorMessage("Failed to create account, please make sure to enter all fields correctly");
                    setSuccessMessage("");
                    // alert("Failed to create account, please make sure to enter all fields correctly");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }else{alert("Email or password is not valid");}
    }

        const onMyAccountButtonClick = () => {
            if(!showAccountSettings) {
                setShowAccountSettings(true);
            } else {
                setShowAccountSettings(false);
                setSuccessMessage("");
                setErrorMessage("");
            }
        }

        const onFriendsButtonClick = () => {
            if(!showSocialBox) {
                setShowSocialBox(true);
            } else {
                setShowSocialBox(false);
            }
        }

    return (
        <div className="background grid grid-rows-12 min-h-screen w-screen p-10">
            <div
                className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2 ">
                <div id="user-div" className="col-span-1"></div>
                <div className="col-span-01 text-3xl text-cyan-500 text-center">{loggesInUser.getUsername()}</div>
                <button onClick={onFriendsButtonClick}
                        className="col-span-10 w-1/6 h-10 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                    <b className="text-3xl">FRIENDS</b>
                </button>
                {showSocialBox ?
                    <div>
                        {/*<Socialbox></Socialbox>*/}
                    </div> :
                    <div>

                    </div>
                    }
            </div>

            <div className="grid row-span-10 grid-cols-3 mb-5 gap-2">
                <div
                    className="grid rows-8 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 col-span-1 w-full h-full justify-self-end">
                    <div className="row-span-1">
                    <p className="text-5xl text-center font-light text-amber-600 underline">AMONG US</p>
                    </div>
                    <div
                        className="p-4 grid grid-rows-3 row-span-7 border-double rounded-lg border-2 border-fuchsia-800 w-11/12 h-5/6 justify-self-center align-items-center">
                        <button onClick={onPlayButtonClick}
                                className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="text-3xl">PLAY</b>
                        </button>

                        {/* Wiederhole für die anderen Buttons */}
                        <button onClick={onMyAccountButtonClick}
                        /*<button*/
                                className="w-full h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                            <b className="text-3xl">MY ACCOUNT</b>
                        </button>
                    </div>

                </div>

                {/* Zweite Hauptspalte */}
                <div
                    className="bg-transparent border-double rounded-lg border-2 border-teal-400 col-span-2 w-full justify-self-start p-4">
                    {/* Inhalt der zweiten Spalte */}
                    {showAccountSettings ? (
                        // TODO add old PasswordField for security reasons
                        <div>
                            <form onSubmit={handleMyAccount}>
                                <p className="text-3xl text-left font-light text-amber-600 ">Account Settings
                                    for {loggesInUser.getUsername()}</p>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">New Username</p>
                                    <input name="newUsername"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           type="text" placeholder="Old or New Username" required/>
                                </label>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">New Email</p>
                                    <input name="newEmail"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           type="text" placeholder="New Email" required/>
                                </label>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">Old Password</p>
                                    <input name="newPassword" type="text"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           placeholder="Old Password" required/>
                                </label>
                                <div className="flex">
                                    <div className="mr-12">
                                        <label>
                                            <p className="text-2xl text-left font-light text-amber-600">New Password</p>
                                            <input name="newPassword" type="text"
                                                   className="input-field min-w-0 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                                   placeholder="New Password" required/>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <p className="text-2xl text-left font-light text-amber-600">Confirm New
                                                Password</p>
                                            <input name="newPasswordConfirm" type="text"
                                                   className="input-field w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                                   placeholder="Confirm Password" required/>
                                        </label>
                                    </div>
                                </div>
                                <br/>
                                <button type="submit"
                                        className="w-full-myAccount h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                                    UPDATE MY ACCOUNT
                                </button>
                                // TODO disable error and success message when re-open the account settings
                                {successMessage &&
                                    <p className="text-2xl-success text-left font-light text-amber-600 ">{successMessage}</p>}
                                {errorMessage &&
                                    <p className="text-2xl-error text-left font-light text-amber-600 ">{successMessage}</p>}
                            </form>
                        </div>
                    ) : (
                        <div>Select an option</div>
                    )}
                </div>
            </div>
        </div>
    );
}