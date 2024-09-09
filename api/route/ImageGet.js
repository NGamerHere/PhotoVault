import express from "express";
import pool from "../services/Db.js";
import mime from 'mime-types';
import jwtDecoding from "../middleware/JwtDecoding.js";

const ImageGet=express.Router();

ImageGet.get('/getImage/:id',jwtDecoding,async (req, res)=>{
   const id=req.params.id;
   const userID=req['tokenData']['userId']
   const imageData=await pool.query('select * from files where id=$1 AND user_id=$2 ',[id,userID]);
   const filename = imageData.rows[0].filename;
   const mimeType = mime.lookup(filename) || 'application/octet-stream';

   res.setHeader('Content-Type', mimeType);

   res.sendFile('/home/datta/photovault/uploads/'+imageData['rows'][0]['filename']);
});

export default ImageGet;
