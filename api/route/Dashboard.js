import express from 'express';
//import jwtDecoding from "../middleware/JwtDecoding.js";

const Dashboard = express.Router();


// Dashboard.get('/api/dashboard', jwtDecoding, (req, res) => {
//     res.status(200).json({ message: 'Access granted to dashboard',data:req['tokenData'] });
// });

export default Dashboard;
