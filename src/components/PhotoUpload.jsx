import {useState} from "react";
import axios from "axios";

function photoUpload() {
    const [file,setFile]=useState(null);
    const inputHandle= (event)=> {
        setFile(event.target.files[0]);
    }
    const handleSubmit=()=>{
        const formData=new FormData();
        formData.append('file',file);
        const auth=localStorage.getItem('auth');
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
        axios.post('/images/upload',formData,{headers: {'Content-Type': 'multipart/form-data',}})
            .then((res)=>{
                console.log(res.data);
            }).catch((e)=>{
            console.error(e.response.data);
        })
    }
    return (
        <>
            <input type='file' onChange={inputHandle} className="mt-2"  />
            <button onClick={handleSubmit} className="p-2 rounded-xl bg-indigo-600" >submit</button>
        </>
    )
}

export default photoUpload;
