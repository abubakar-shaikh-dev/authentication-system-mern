import express from "express";
import { conn } from "./database/conn.js"
import route from "./routes/route.js"
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

//Middlewares
    //Cors
        app.use(cors())
    //BodyParser
        app.use(bodyParser.json())
        
//Initialization
    //ENV
        dotenv.config();
    //Database Connection
        conn();
    //Express
        const app = express();
        app.use(express.json());


app.get("/",(req,res)=>{
    res.status(403).send("Forbidden!")
})

app.use("/api",route);

const PORT = 3000;

app.listen(PORT,()=>console.log(`[PASS] Server Running on PORT ${PORT}`))
