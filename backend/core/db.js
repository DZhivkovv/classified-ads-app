import dotenv from 'dotenv'
dotenv.config({path: '../.env'});
import mongoose from 'mongoose'

// console.log(process.env.DB_URL);
export async function dbConnect(db_url){

    if(!db_url){
        console.error('No DB_URL defined in .env file');
        process.exit(1);
    }
    
    try{
        console.log("Connecting to MongoDB...");
        await mongoose.connect(db_url)    
        console.log("Connection successful!")

    } catch(error){
        console.log("Unable to connect to MongoDB!")
        console.error(error);
        process.exit(1);
    }
}