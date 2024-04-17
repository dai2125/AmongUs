import {FormEvent} from "react";

type Props = {
    onCreateClick(name:string, email: string, password: string, passwordConfirm: string ): void;
    onLoginNavClick(): void;
}

export default function CreateAccount({onCreateClick, onLoginNavClick}: Props){

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
            onCreateClick(name, email, password, passwordConfirm);
        }else {
            alert("Email or password is not valid");
        }


    }

    return(
        <div className="background">
            <div className="flex items-center justify-center h-screen">
                <div className="grid grid-rows-10 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 w-1/2 h-auto">
                    <div className="row-span-2 flex items-center justify-center text-white"><b>Create Account</b></div>
                    <div className="row-span-7 justify-self-center">
                        <form onSubmit={onFormSubmit} className="p-3">
                            <div>
                                <label className="text-white">Username:</label><br/>
                                <input name="name" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20" required/><br/>
                                <label className="text-white">E-mail:</label><br/>
                                <input name="email" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20" required/><br/>
                                <label className="text-white">Password:</label><br/>
                                <input type="password" name="password"  className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20" required/><br/>
                                <label className="text-white">Confirm Password:</label><br/>
                                <input type="password" name="passwordConfirm" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-opacity-20" required/><br/>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3 text-white"
                                    type="submit">Sign-Up</button>
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