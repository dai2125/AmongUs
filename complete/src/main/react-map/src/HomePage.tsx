import React, {FormEvent, useState} from 'react';
import './main.css'
import './output.css';

type Props ={
    loggesInUser: string;
    onPlayButtonClick(): void;
}

export default function HomePage({loggesInUser, onPlayButtonClick}: Props) {

    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");
    const [successMessage , setSuccessMessage] = useState("");

    const handleMyAccount = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const user = {
            name: data.get('newUsername') as string,
            email: data.get('newEmail') as string,
            password: data.get('newPassword') as string,
            passwordConfirm: data.get('newPasswordConfirm') as string,
        }

        fetch('http://localhost:8080/myAccount',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((data) => {
                if (data.status === 200){
                    setSuccessMessage("Account Changed Successfully");
                    // alert("Account Created Successfully");

                } else {
                    setErrorMessage("Failed to create account, please make sure to enter all fields correctly");
                    // alert("Failed to create account, please make sure to enter all fields correctly");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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

    return (
        <div className="background grid grid-rows-12 min-h-screen w-screen p-10">
            <div className="grid grid-cols-12 w-full h-14 mt-3 bg-transparent border-double rounded-lg border-2 border-amber-500 justify-self-center row-span-2">
                <div id="user-div" className="col-span-1"></div>
                <div className="col-span-1 text-3xl text-cyan-500 text-center">{loggesInUser}</div>
            </div>

            <div className="grid row-span-10 grid-cols-3 mb-5 gap-2">
                <div className="grid rows-8 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 col-span-1 w-full h-full justify-self-end">
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
                        <div>
                            <form onSubmit={handleMyAccount}>
                                <p className="text-3xl text-left font-light text-amber-600 ">Account Settings
                                    for {loggesInUser}</p>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">New Username</p>
                                    <input name="newUsername"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           type="text" placeholder="New Username"/>
                                </label>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">New Email</p>
                                    <input name="newEmail"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           type="text" placeholder="New Email"/>
                                </label>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">New Password</p>
                                    <input name="newPassword" type="text"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           placeholder="New Password"/>
                                </label>
                                <label>
                                    <p className="text-2xl text-left font-light text-amber-600 ">Confirm New
                                        Password</p>
                                    <input name="newPasswordConfirm" type="text"
                                           className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                           placeholder="Confirm Password"/>
                                </label>
                                <br/>
                                <button type="submit"
                                        className="w-full-myAccount h-5/6 row-span-1 bg-cyan-400 bg-opacity-50 hover:bg-cyan-600 rounded-lg focus:ring-4 focus:ring-fuchsia-600">
                                    UPDATE MY ACCOUNT
                                </button>
                                // TODO disable error and success message when re-open the account settings
                                {successMessage && <p className="text-2xl-success text-left font-light text-amber-600 " >{successMessage}</p>}
                                {errorMessage && <p className="text-2xl-error text-left font-light text-amber-600 " >{successMessage}</p>}
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