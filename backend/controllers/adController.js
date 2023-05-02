import Ad from '../models/adModel.js'

export const saveAdvertisement = async (request, response, next) => {
    const {title, description, price, userID, username} = request.body;
    const images = request.file.filename;

    try{
        const ad = new Ad({
            title, 
            description, 
            price, 
            postedBy:userID,
            username,
            images,
        })
        ad.save();
        response.send({
            status:200,
            message:"Ad saved successfully"
        })
    } catch(error){
        response.send({
            status:500,
            message:"Internal server error"
        })
    }
}
export const getAllAds = async (request, response, next) => {
    try{
        const ads = await Ad.find();
        response.json(ads)
    } catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
}