import React, {FormEvent, useState} from "react";
import {User} from "../User";

type Props = {
    //onCreateClick(name:string, email: string, password: string, passwordConfirm: string ): void;
    onLoginNavClick(): void;
}

export default function CreateAccount({onLoginNavClick}: Props){
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    let loggedInUser = new User();

    function onFormSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const passwordConfirm = data.get('passwordConfirm') as string;

        // Regex for 8 characters long
        const passwordRegex = /^.{8,}$/;
        /**
         * Regex for email validation
         */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if((passwordRegex.test(password)) && (emailRegex.test(email))){
            handleCreate(name, email, password, passwordConfirm);
        }else {
            setErrorMessage("Email or password is not valid");
        }


    }

    const handleCreate = (name:string, email: string, password: string, passwordConfirm: string) => {

        const newUser = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }

        if(!(password === passwordConfirm)){
            // alert("password and confirm-password do not match")
            setErrorMessage("password and confirm-password do not match");
            setSuccessMessage("");
        }else {

            fetch('http://localhost:8080/signUp',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then((data) => {
                    if (data.status === 200){
                        setSuccessMessage("Account Created Successfully");
                        setErrorMessage("");
                    } else {
                        //alert("Failed to create account, please make sure to enter all fields correctly");
                        setErrorMessage("Failed to create account, please make sure to enter all fields correctly");
                        setSuccessMessage("");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return(
        <div className="background">
            <div className="flex items-center justify-center h-screen">
                <div className="grid grid-rows-10 bg-black border-double rounded-lg border-2 border-fuchsia-800 w-1/2 h-auto">
                    <div className="grid grid-rows-2 row-span-2 justify-center text-white">
                        <div className="row-span-1 justify-self-center">
                            <div className="error-notification">
                                {errorMessage}
                            </div>
                            <div className="success-notification">
                                {successMessage}
                            </div>
                        </div>
                        <div className="row-span-1 justify-self-center">
                            <b>Create Account</b>
                        </div>
                    </div>
                    <div className="row-span-7 justify-self-center">
                        <form onSubmit={onFormSubmit} className="p-3">
                            <div>
                                <label className="text-white">Username:</label><br/>
                                <input name="name"
                                       className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                       required/><br/>
                                <label className="text-white">E-mail:</label><br/>
                                <input name="email"
                                       className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                       required/><br/>
                                <label className="text-white">Password:</label><br/>
                                <input type="password" name="password"
                                       className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                       required/><br/>
                                <label className="text-white">Confirm Password:</label><br/>
                                <input type="password" name="passwordConfirm"
                                       className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                       required/><br/>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3 text-white"
                                    type="submit">Sign-Up
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="row-span-1 flex justify-between px-4">
                        <p className="text-white">Already have an account?</p>
                        <button onClick={onLoginNavClick} className="underline text-blue-500">Log-in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}