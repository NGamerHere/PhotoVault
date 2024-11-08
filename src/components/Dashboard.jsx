import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import PhotoUpload from "./PhotoUpload.jsx";

const Dashboard=()=>{
      const [ImageData,setImageData]=useState([]);
      const navigation= useNavigate();

      const ImageDataFetcher=()=>{
          const auth=localStorage.getItem('auth');
          axios.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
          axios.get('/api/getImageLink').then((res)=>{
              console.log(res.data);
              setImageData(res.data);
          }).catch((e)=>{
              console.error("error in getting the data : ", e)
              if(e.response.status === 403 || e.response.status === 401){navigation('/login');}
          })
      }

      useEffect(() => {
          ImageDataFetcher();
      }, []);

 return <>
  <div className="mt-14" >
   <h1 className="text-2xl">Dashboard</h1>
   <PhotoUpload  />
      {
          ImageData.map((item,index)=>{
              return <div key={index} > { item.filename } <img alt='image' src={ '/getImage/'+item.id } />  </div>
          })
      }
  </div>
 </>
}
export default Dashboard;
