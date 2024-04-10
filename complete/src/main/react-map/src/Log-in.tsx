import React, {FormEvent} from 'react';

type Props ={
    onLogIn(name: string, password: string): void;
    onCreateAccountNav():void;
}

export default function LogIn({onLogIn, onCreateAccountNav,}: Props){

    function onFormSubmit(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        const form = event.currentTarget;
        const  data = new FormData(form);
        const name = data.get('name') as string;
        const password = data.get('password') as string;

        onLogIn(name, password);

    }

    return(
        <div className="background">
            <div className="flex items-center justify-center h-screen">
                <div className="grid grid-rows-10 bg-opacity-75 border-double rounded-lg border-2 border-fuchsia-800 w-1/2 h-96">
                    <div className="row-span-2 flex items-center justify-center text-white"><b>LOG-IN</b></div>
                    <div className="row-span-7 justify-self-center">
                        <form onSubmit={onFormSubmit} className="p-3">
                            <div>
                                <label>name:</label><br/>
                                <input name="name" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /><br/>
                                <label>PassWord:</label><br/>
                                <input name="password" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /><br/>
                            </div>

                            <div className="flex justify-center">
                                <button className="bg-blue-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3" type="submit">Log-In</button>
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
