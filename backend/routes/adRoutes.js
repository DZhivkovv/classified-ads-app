import express from 'express'
import multer from 'multer';
import { saveAdvertisement, getAllAds, getSingleAd, searchAds } from '../controllers/adController.js';

const adRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../frontend/public/images');
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req,file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage, fileFilter})

adRouter.post('/advertisements', upload.array('images'), saveAdvertisement)
adRouter.get('/ads/:id', getSingleAd)
adRouter.get('/getAllAds', getAllAds)
adRouter.get('/searchAds', searchAds)

export default adRouter