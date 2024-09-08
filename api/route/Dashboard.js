import express from 'express';
import jwt from 'jsonwebtoken';

const Dashboard = express.Router();

const jwtDecoding = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }


    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing or improperly formatted' });
    }

    try {
        req['tokenData']=jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};


Dashboard.get('/api/dashboard', jwtDecoding, (req, res) => {
    res.status(200).json({ message: 'Access granted to dashboard',data:req['tokenData'] });
});

export default Dashboard;
