import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv'
import sequelize from "./api/services/Db.js";
import Login from "./api/route/Login.js";
import Dashboard from "./api/route/Dashboard.js";
import ImageUpload from "./api/route/ImageUpload.js";
import ImageGet from "./api/route/ImageGet.js";
dotenv.config();


sequelize.sync({alter:true})
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((error) => {
        console.error('Error syncing the database:', error);
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
app.use(ImageGet);

app.get('/api/testing',async (req,res)=>{
   res.send('this is testing');
});

app.get('/api/testingv1',async (req,res)=>{
    res.send('this is testing v1');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port=process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port `+port);
});
