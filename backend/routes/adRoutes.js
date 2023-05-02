import express from 'express'
import multer from 'multer';
import { saveAdvertisement, getAllAds } from '../controllers/adController.js';

const adRouter = express.Router();

adRouter.post('/advertisements', saveAdvertisement)

export default adRouter