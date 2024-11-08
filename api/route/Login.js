import express from "express";
import jwt from "jsonwebtoken";
import User  from "../model/User.js";

const Login = express.Router();


Login.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '48h' });

                return res.status(200).json({
                    status: 'you have logged in',
                    token: token
                });
            } else {
                return res.status(401).json({ message: 'wrong password' });
            }
        } else {
            return res.status(404).json({ message: 'account not found' });
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: 'internal server error' });
    }
});


Login.post('/api/registration', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({ name, email, password });

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error("Error in registration:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'email already exists' });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
});

export default Login;
