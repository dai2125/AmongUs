export default function LogIn(){
    return(
        <div className="grid grid-rows-10 bg-transparent border-double rounded-lg border-2 border-fuchsia-800 w-1/2 h-80">
            <div className="row-span-2 flex items-center justify-center"><b>LOG-IN</b></div>
            <div className="row-span-7 justify-self-center">
                <form className="p-3">
                    <div>
                        <label>E-mail:</label><br/>
                        <input className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /><br/>
                        <label>PassWord:</label><br/>
                        <input name="body" className="input-field bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /><br/>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-500 hover:bg-gray-400 text-slate-50 font-bold py-2 px-4 rounded mt-3" type="submit">Log-In</button>
                    </div>
                </form>
            </div>
            <div className="row-span-1 flex justify-between px-4">
                <p className="">Don't have an Account?</p>
                <a href="" className="underline text-blue-500">Create Account</a>
            </div>
        </div>
    );
}
