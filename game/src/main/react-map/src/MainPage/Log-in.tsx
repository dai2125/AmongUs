import React, {FormEvent, useState} from 'react';
import '../CSS/Log-in.css';
import {User} from "../User";

let loggedInUser = new User();
type Props ={
    onLogIn(loggedInUser: User): void;
    onCreateAccountNav():void;
}

export default function LogIn({onLogIn, onCreateAccountNav,}: Props){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    function onFormSubmit(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);
        const name = data.get('name') as string;
        const password = data.get('password') as string;


        if (name === '' || password === '') {
            setErrorMessage('Please fill out all fields');
            return;
        }else { handleLogin(name, password);}

        setName('');
        setPassword('');

    }

    const handleLogin = (name:string, password: string) => {

        const user ={
            name : name,
            password: password
        }

        fetch('http://localhost:8080/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(data => {
                if(data.status === 200){
                    // alert("Log In Successful");
                    loggedInUser.setUsername(name);
                    loggedInUser.setPassword(password);
                    loggedInUser.setColor("red");
                    onLogIn(loggedInUser);
                } else {
                    setErrorMessage('Wrong credentials');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return(
        <div className="background">
            <div className="flex items-center justify-center h-screen">
                <div className="grid grid-rows-10 bg-black border-double rounded-lg border-2 border-fuchsia-800 w-1/2 h-96">
                    <div className="row-span-2 flex items-center justify-center text-white">
                        <div className="grid grid-rows-2 row-span-2 justify-center text-white">
                            <div className="error-notification row-span-1 justify-self-center">
                                {errorMessage}
                            </div>
                            <div className="row-span-1 justify-self-center">
                                <b>Log-In</b>
                            </div>
                        </div>
                    </div>
                    <div className="row-span-7 justify-self-center">
                        <form onSubmit={onFormSubmit} className="p-3">
                            <div>
                                <label className="text-white">Name:</label><br/>
                                <input name="name"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                        className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                        /><br/>
                                <label className="text-white">Password:</label><br/>
                                <input  type="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20 text-white"
                                        /><br/>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3"
                                    type="submit">Log-In
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="row-span-1 flex justify-between px-4">
                        <p className="text-white">Don't have an Account?</p>
                        <button onClick={onCreateAccountNav} className="underline text-blue-500">Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
