import express from "express";
import { conn } from "./database/conn.js"
import route from "./routes/route.js"
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
conn();
        
        

        

app.get("/",(req,res)=>{
    res.status(403).send("Forbidden!")
})

app.use("/api",route);

const PORT = 3000;

app.listen(PORT,()=>console.log(`[PASS] Server Running on PORT ${PORT}`))
