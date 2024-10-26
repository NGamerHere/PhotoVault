import express from "express";
import mime from 'mime-types';
import jwtDecoding from "../middleware/JwtDecoding.js";
import path from 'path';
import File from "../model/File.js";

const ImageGet = express.Router();

ImageGet.get('/getImage/:id', jwtDecoding, async (req, res) => {
   const id = req.params.id;
   const userID = req['tokenData']['userId'];

   try {
      const imageData = await File.findOne({
         where: {
            id: id,
            user_id: userID
         }
      });

      if (imageData) {
         const filename = imageData.filename;
         const mimeType = mime.lookup(filename) || 'application/octet-stream';

         res.setHeader('Content-Type', mimeType);
         res.sendFile(path.resolve('/home/datta/photovault/uploads/', filename));
      } else {
         res.status(404).send('not found');
      }
   } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).send('internal server error');
   }
});

ImageGet.get('/api/getImageLink', jwtDecoding, async (req, res) => {
   const userID = req['tokenData']['userId'];

   try {
      const imageData = await File.findAll({
         where: {
            user_id: userID
         },
         attributes: ['id', 'filename', 'uploadedAt']
      });

      res.json(imageData);
   } catch (error) {
      console.error("Error fetching image links:", error);
      res.status(500).send('internal server error');
   }
});

export default ImageGet;
