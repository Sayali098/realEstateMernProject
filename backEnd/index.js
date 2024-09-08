import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/usermodel.js";
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import listingRouter from './routes/listingRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';    //for deploy


dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const __dirname=path.resolve();


app.use(express.json())
app.use(cookieParser());

app.use(cors());
// URI="mongodb+srv://shelakesayali9022:mernRealEstate@cluster0.fyavg5m.mongodb.net/mernestate"
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });


  app.use('/api/user',userRouter)
  
  app.use('/api/auth',authRouter)
  
  app.use('/api/listing',listingRouter)
  

  app.use(express.static(path.join(__dirname,'frontEnd/dist')))
  
  app.get('*',(req,res)=>{

    res.sendFile(path.join(__dirname,'frontEnd','dist','index.html'))
  })

  app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || 'Internal Server Error'
    return res.status(statuscode).json({
      success:false,
      statuscode,
      message
    })

  }
  )
app.listen(3000, () => {
  console.log(`Server is ruuning on port ${port}`);
});
