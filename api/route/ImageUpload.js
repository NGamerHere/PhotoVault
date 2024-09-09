import multer from "multer";
import path from "path";
import express from "express";
import jwtDecoding from "../middleware/JwtDecoding.js";
import pool from "../services/Db.js";

const ImageUpload = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

ImageUpload.post('/images/upload', jwtDecoding, upload.single('file'), async (req, res) => {
    if (!req.file) {
        console.log(req.file);
        return res.status(400).send('No file uploaded.');
    }

    const userId=req['tokenData']['userId']
    try {
        const { filename } = req.file;
        console.log(filename);
        const result = await pool.query(
            'INSERT INTO files (filename, user_id) VALUES ($1, $2) RETURNING *',
            [filename, userId]
        );
        if(result['rowCount'] > 0 ){
            res.json( { message:`File uploaded successfully: ${req.file.filename}` } );
        }else{
            console.error('Error saving file to database:', error);
            res.status(500).send('Error saving file information.');
        }
    } catch (error) {
        console.error('Error saving file to database:', error);
        res.status(500).send('Error saving file information.');
    }
});

export default ImageUpload;
