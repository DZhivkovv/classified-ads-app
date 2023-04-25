import express from 'express'
import {register, login, isUserAuth} from '../controllers/auth.js'
import { verifyJWT } from '../utils/auth.js';

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.get('/isUserAuth', isUserAuth)
router.get('/getUsername', verifyJWT, (request, response) =>{
    response.json({isLoggedIn: true, username: request.user.username})
})

export default router