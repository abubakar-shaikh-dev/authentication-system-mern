import express from "express";
import { conn } from "./database/conn.js"
import route from "./routes/route.js"
import cors from "cors";
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/",(req,res)=>{
    res.status(403).send("Forbidden!")
})

app.use("/api",route);

const PORT = 3000;

app.listen(PORT,()=>console.log(`[PASS] Server Running on PORT ${PORT}`))
