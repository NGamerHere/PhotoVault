import express from "express";
import client from "../services/Db.js";
import jwt from "jsonwebtoken";
const Login=express.Router();

Login.post('/api/login',(req, res)=>{
    const {email,password} = req.body;
    client.query("select * from users where email='"+email+"';").then((data)=>{
        if(data['rows'].length >0 ){
            if(data['rows'][0]['password'] === password ){
                const token = jwt.sign({ userId: data['rows'][0]['id'] }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                res.json({
                    status:'you have logged in',
                    token:token
                }).status(200); 
            }else{
                res.json({message:'wrong password'})
            }
        }else{
            res.json({ message:'account not found' }).status(404)
        }
    })
});

Login.post('/api/registration',async (req, res)=>{
    const {name,email,password}=req.body;
    client.query(" insert into users(name,email,password) values ($1,$2,$3) ",[name,email,password]).then((data)=>{
        if(data.rowCount > 0){
            return res.json({
                message:'saved'
            })
        }else{
            return res.json({
                message:'error in saving the data'
            }).status(501)
        }
    }).catch((e)=>{
        console.error("error in saving the user "+e.code)
        if(e.code === '23505' ){
            return res.json({message:'email already exits'})
        }else{
            return res.json({message:'internal server error'}).status(501);
        }
    })

});


export default Login;