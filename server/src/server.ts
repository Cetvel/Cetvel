//Import NPM Modules
import express from 'express';
import connectDB from './config/config';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


//
const app = express();
dotenv.config();

//Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


import User from './models/user.model';
app.get('/essay',async (req, res) => {
	const  user = await User.findById('669f721e7f0a639f126ddd3a');
	const userId = user?.getStringId();
	console.log(userId);
	res.send('Hello World');
}) 

//Import Routes
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

//API's Implementation
app.use('/auth', authRouter);
app.use('/user', userRouter);

//PORT
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
})