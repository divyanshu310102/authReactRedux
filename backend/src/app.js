import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import userRouter from "./routes/user.route.js"



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
    
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use("/user",userRouter)

app.use(errorHandler)








export {app};



