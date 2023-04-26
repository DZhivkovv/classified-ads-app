import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import bodyParser from 'body-parser';
import { dbConnect } from './core/db.js';
import router from './routes/authRoutes.js';

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router)

const port = process.env.PORT;
if(!port){
    console.log("Port is not defined in .env!");
    process.exit(1);
}

const db_url = process.env.DB_URL;
dbConnect(db_url);


try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}