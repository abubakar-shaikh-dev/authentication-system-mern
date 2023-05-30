import mongoose from "mongoose";

export async function conn(){
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log("[PASS] Database connection is Successfull.");
    }catch(err){
        console.log(`[FAIL] Failed to connect to Database : ${err.message}`);
    }
}

