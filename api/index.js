import express from "express";
import { conn } from "./database/conn.js"
import route from "./routes/route.js"
const cors = require('cors');
import bodyParser from "body-parser";
import dotenv from 'dotenv';

//Initialization
    //ENV
        dotenv.config();
    //Database Connection
        conn();
    //Express
        const app = express();
        app.use(express.json());

//Middlewares
    //Cors
        app.use(cors())
    //BodyParser
        app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.status(403).send("Forbidden!")
})

app.use("/api",route);

const PORT = 8000;

app.listen(PORT,()=>console.log(`[PASS] Server Running on PORT ${PORT}`))
