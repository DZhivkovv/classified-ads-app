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
            console.log("User created successfully!")
            response.status(201).send({
                message:"User created successfully!",
                result,
            });
        })
        .catch((error)=>{
            console.log("Error creating user")
            response.status(500).send({
                message: "Error creating user",
                error
            });
        });
    }).catch((error) => {
        console.log('Password was not hashed successfully')
        response.status(500).send({
            message:"Password was not hashed successfully",
            error,
        });
    });
});

})

try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}