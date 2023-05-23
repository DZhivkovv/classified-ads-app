import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { saveAdvertisement, getAllAds, getSingleAd, searchAds } from '../controllers/adController.js';

const adRouter = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    format: async (req, file) => 'jpg',
  }
});

const upload = multer({ storage });

adRouter.post('/advertisements', upload.array('images'), saveAdvertisement);
adRouter.get('/ads/:id', getSingleAd);
adRouter.get('/getAllAds', getAllAds);
adRouter.get('/searchAds', searchAds);

export default adRouter;
