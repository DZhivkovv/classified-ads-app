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