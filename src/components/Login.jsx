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
        <div className='flex justify-center' >
            <div>
                <h1 className="text-2xl">login page</h1>
                <div className="mt-2" >
                    <input type="text"
                           className="border-2 border-gray-600 p-1 rounded-xl "
                           value={email}
                           onChange={handleEmailChange} />
                </div>
                <div className="pt-3" >
                    <input type="password"
                           className="border-2 border-gray-600 p-1 rounded-xl "
                           value={password}
                     onChange={handlePasswordChange}
                    />
                </div>
                <button onClick={handleSubmit} className="p-3 bg-indigo-500 rounded-xl mt-3 " > Submit </button>
            </div>
        </div>
    </>
}

export default Login;