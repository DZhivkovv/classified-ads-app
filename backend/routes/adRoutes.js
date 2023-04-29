import express from 'express'
import { saveAdvertisement } from '../controllers/adController.js';

const adRouter = express.Router();

adRouter.post('/advertisements', saveAdvertisement)

export default adRouter