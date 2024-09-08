import './App.css'
import {useState} from "react";
import axios from "axios";

function App() {
    const [file,setFile]=useState(null);
    const inputHandle= (event)=> {
        setFile(event.target.files[0]);
    }
    const handleSubmit=()=>{
        const formData=new FormData();
        formData.append('file',file);
        axios.post('/images/upload',formData,{headers: {'Content-Type': 'multipart/form-data',}})
            .then((res)=>{
                console.log(res.data);
            }).catch((e)=>{
            console.error(e.response.data);
        })
    }
    return (
        <>
            <input type='file' onChange={inputHandle}  />
            <button onClick={handleSubmit} >submit</button>
        </>
    )
}

export default App
