import express from 'express'
import session from 'express-session'
import crypto from 'crypto'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors({
    allowedHeaders: '*'
}))
app.use(express.json());

const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret:secretKey,
    resave: false,
    saveUninitialized: false,

}))

const port = process.env.PORT;

if(!port){
    console.log("port is not defined!");
    process.exit(1);
}

const db_url = process.env.DB_URL;
dbConnect(db_url);

})

try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}