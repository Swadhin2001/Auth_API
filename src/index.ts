import express from "express";
import 'dotenv/config'
import connectDB from './db/index'

const app = express();
const port = process.env.PORT;


app.get ('/', (req, res)=>{
    res.send ("Hello World Express");
})

app.listen (port, ()=>{
    connectDB;
    console.log (`App is listening on port: ${port}`);
})