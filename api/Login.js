import express from "express";
import client from "./services/Db.js";
const Login=express.Router();



Login.post('/api/login',(req, res)=>{
    const {username,password} = req.body;
    client.query("select * from users where email='"+username+"';").then((data)=>{
        if(data['rows'].length >0 ){
            if(data['rows'][0]['password'] === password ){
                res.json({
                    status:'you have logged in'
                }).status(200);
            }else{
                res.json({message:'wrong password'})
            }

        }else{
            res.json({ message:'account not found' }).status(404)
        }
    })
});


export default Login;