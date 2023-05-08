import User from '../models/userModel.js'
import Ad from '../models/adModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { response } from 'express'
dotenv.config({path:'../.env'})

export const register = async (request, response, next) => {
    const {email, username, password} = request.body;

    const takenEmail = await User.findOne({"email": email});
    const takenUsername = await User.findOne({"username": username});



    if(takenEmail || takenUsername){
        response.json({message:"Username or email has already been taken"})
    } else{
        const hashedPassword = await bcrypt.hash(password, 10);

        const dbUser = new User({
            email:email,
            username: username,
            password:hashedPassword
        })

        dbUser.save();
        response.json({message: "User created successfully!"})
    }
}


export const login = async (request, response) => {
    const {email, password} = request.body;
    
    await User.findOne({email:email})
    .then(async (dbUser) => {
        if(!dbUser){
            return response.json({
                status: 400,
                message:"Invalid username or password"
            })
        }
        const isCorrect = await bcrypt.compare(password, dbUser.password)
        if (isCorrect){
            const payload = {
                id: dbUser._id,
                username: dbUser.username
            }
            try {
                const token = await new Promise((resolve, reject) => {
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (error, token) => {
                            if(error) reject(error);
                            resolve(token);
                        }
                    )
                })

                return response.json({
                    status:200,
                    isLoggedIn: true,
                    message: "Success",
                    token:token
                })
            } catch (error) {
                return response.status(400).json({message: error})
            }
        } else {
            return response.status(400).json({
              status: 400,
              message:"Invalid username or password"
          })
        }
    })
}

export const isUserAuth = async (request, response) => {
    // Get the token from the request header
    const token = request.headers['x-access-token'];
    const tokenValue = token === 'null' ? null : token
    if(!tokenValue){
      response.send({
        status: 404,
        isLoggedIn: false,
        message:"Token not found",
      })  
    } else{
      const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET)
      const username = decodedToken.username
      const userID = decodedToken.id  
      response.send({
        status:200,
        username,
        userID,
        isLoggedIn: true,
      })
  
    }
  } 

export const getUserData = async ( request, response, next) => {
    try{
        const id = request.params.id;
        const user = await User.findById(id);
        const adCount = await Ad.countDocuments({ postedBy: id });
        const userAds = await Ad.find({ postedBy: id }).sort({date: -1}).limit(4);
        
        response.send({
        status: 200,
        id: user._id,
        username: user.username,
        email: user.email,
        userAds: userAds,
        adCount: adCount,
        });
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
};
