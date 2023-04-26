import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})

export function verifyJWT(request, response, next){
    const token = request.headers['x-access-token']?.split('')[1]

    if (token){
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if(err) return response.json({
                isLoggedIn: false,
                message: "Failed to authenticate"
            })
            
            request.user = {}
            request.user.id = decoded.id
            request.user.username = decoded.username
            next()
        })
    } else {
        response.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}