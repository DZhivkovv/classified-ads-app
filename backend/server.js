import express from 'express'
import session from 'express-session'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './core/db.js';
import User from './models/userModel.js'
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
    console.log("Port is not defined in .env!");
    process.exit(1);
}

const db_url = process.env.DB_URL;
dbConnect(db_url);

app.post('/signup', (request,response) => {
    const{email, username, password} = request.body;

    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
        });
        user.save()
        .then((result) => {
            response.status(201).send({
                message:"User created successfully!",
                result,
            });
        })
        .catch((error)=>{
            response.status(500).send({
                message: "Error creating user",
                error
            });
        });
    }).catch((error) => {
        response.status(500).send({
            message:"Password was not hashed successfully",
            error,
        });
    });
});


app.post('/login', async (request, response) => {
    const {email, password} = request.body;

    if(!email || !password){
        response.status(500).send({
            message:"Email or password is missing!",
            error
        })
    }
    const user = await User.findOne({email: email}) //Finding the user in db

    if(!user){
        response.status(500).send({
            message:"User not found!",
            error
        })
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if(matchPassword){
        const userSession = {email: user.email, username: user.username}; //creating user session
        request.session.user = userSession;
        response.status(200).send({
            message:"Successful login!",
            user: userSession
        })
    }
})

try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}