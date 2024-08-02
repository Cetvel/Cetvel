//Import NPM Modules
import express from 'express';
import connectDB from './config/config';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

//
const app = express();
dotenv.config();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}

//Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

import authenticateToken from './middlewares/authenticateToken';

app.get("/api/deneme" , (req,res)=>{
	res.send("acik yer")
})

app.get("/api/auth-deneme", (req,res,next)=>{
	console.log("auth-deneme")
	console.log(req.cookies)
	next()
} ,authenticateToken , (req,res)=>{
	res.send("korunmus yer")
})

//Import Routes
import pomodoroRouter from './routes/pomodoro.route';
import examRouter from './routes/exam.route';
import todoRouther from './routes/todo.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

//API's Implementations
app.use('/api/pomodoro', pomodoroRouter);
app.use('/api/exam', examRouter);
app.use('/api/todo', todoRouther);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


// Error handler middleware
app.use(errorHandler);

//PORT
app.listen(5000, () => {
	console.log('Server is running on http://localhost:5000');
})