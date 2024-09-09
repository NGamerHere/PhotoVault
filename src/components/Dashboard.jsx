import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import axios from "axios";
import PhotoUpload from "./PhotoUpload.jsx";

const Dashboard=()=>{
 const navigation= useNavigate();
 useEffect(() => {
  const auth=localStorage.getItem('auth');
  axios.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
  axios.get('/api/dashboard').then((res)=>{
   console.log(res.data);
  }).catch((e)=>{
    console.error("error in getting the data : ", e)
   if(e.response.status === 403 || e.response.status === 401){
     navigation('/login');
   }
  })
 }, []);

return <>
 <h1 className="text-2xl" >Dashboard</h1>
  <PhotoUpload />
</>
}
export default Dashboard;
