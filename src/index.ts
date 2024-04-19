import express from "express";
import 'dotenv/config'
import connectDB from './db/index'
import {router}  from "./routes/index";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT;

app.use (bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());


app.use ('/', router);
app.use ('/login', router);
app.get ('/', (req, res)=>{
    res.send ("Hello World Express");
})


app.listen (port, ()=>{
    connectDB;
    console.log (`App is listening on port: ${port}`);
})