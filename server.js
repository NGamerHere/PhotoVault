import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv'
import client from "./api/services/Db.js";
import Login from "./api/route/Login.js";
import Dashboard from "./api/route/Dashboard.js";
import ImageUpload from "./api/route/ImageUpload.js";
dotenv.config();



client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

const app=express();


app.use(bodyParser.urlencoded({extended:true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use(Login);
app.use(Dashboard);
app.use(ImageUpload);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
