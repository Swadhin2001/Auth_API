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
app.use ('/user', router);
app.use ('/login', router);
app.use ('/verify', router);
app.use ('/info', router);


app.listen (port, ()=>{
    connectDB;
    console.log (`App is listening on port: ${port}`);
})