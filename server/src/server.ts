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



//Import Routes
import todoRouther from './routes/todo.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

//API's Implementations
app.use('/todo', todoRouther);
app.use('/auth', authRouter);
app.use('/user', userRouter);

//PORT
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
})