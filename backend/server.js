import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import bodyParser from 'body-parser';
import { dbConnect } from './core/db.js';


const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
dbConnect(process.env.DB_URL);

const port = process.env.PORT;

if(!port){
    console.log("port is not defined!");
    process.exit(1);
}

app.get('/', (request, response) => {
    response.send('Connected');
})

try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}