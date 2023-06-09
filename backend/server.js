import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import bodyParser from 'body-parser';
import { dbConnect } from './core/db.js';
import router from './routes/authRoutes.js';
import adRouter from './routes/adRoutes.js';

const app = express();
app.use(express.json())
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://classified-ads-website.onrender.com',
    credentials: true,
    methods: ['OPTIONS', 'GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Depth', 'User-Agent', 'X-File-Size', 'X-Requested-With', 'If-Modified-Since', 'X-File-Name', 'Cache-Control', 'x-access-token'],
}
app.use(cors(corsOptions));
app.use('/api', router)
app.use('/', adRouter)

const port = process.env.PORT;
if(!port){
    console.log("Port is not defined in .env!");
    process.exit(1);
}

const db_url = process.env.DB_URL;
if(!db_url){
    console.log("DB_URL is not defined in .env file")
    process.exit(1);
}
dbConnect(db_url);


try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}