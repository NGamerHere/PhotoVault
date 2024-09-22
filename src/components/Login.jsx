import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){

    const navigation= useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleEmailChange=(event)=>{
        setEmail(event.target.value);
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit=()=>{
        console.log(email);
        console.log(password);
        axios.post('/api/login',{
            email:email,
            password:password
        }).then((res)=>{
            if(res.status === 200 ){
                localStorage.setItem("auth", res.data['token']);
                navigation('/dashboard');
            }
        }).catch((err)=>{
            console.error(err);
        })
    }


    return <>
        <div className='flex justify-center h-[56em] mx-auto items-center w-full' >
                <div className="border w-96 h-fit p-5 border-gray-300 rounded-xl shadow shadow-gray-400 hover:shadow-gray-600 hover:shadow-lg "  >
                    <h1 className="text-4xl font-semibold text-center ">login page</h1>
                    <div className="mt-6 flex justify-center ">
                        <input type="text"
                               className="border-2 w-72 border-gray-600  p-2 rounded-xl"
                               placeholder="email"
                               value={email}
                               onChange={handleEmailChange}/>
                    </div>
                    <div className="mt-4 justify-center flex ">
                        <input type="password"
                               className="border-2 w-72 border-gray-600 p-2 rounded-xl "
                               placeholder="password"
                               value={password}
                               onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex justify-center" >
                        <button onClick={handleSubmit} className="p-2 px-3 bg-indigo-500 rounded-xl mt-3 "> Submit</button>
                    </div>
                </div>
        </div>
    </>
}

export default Login;