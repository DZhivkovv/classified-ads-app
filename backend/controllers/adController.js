import Ad from '../models/adModel.js'

export const saveAdvertisement = async (request, response, next) => {
    const {title, description, price, category, userID, username} = request.body;

        const images = request.files.length > 0 ? request.files.map(file => file.filename) : ['no-images-available.png']

    try{
        const ad = new Ad({
            title, 
            description, 
            price, 
            category,
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

export const getSingleAd = async ( request, response, next) => {
    try{
        const id = request.params.id;
        const ad = await Ad.findById(id);
        response.send({
            status:200,
            id:ad._id,
            title:ad.title,
            description:ad.description,
            price:ad.price,
            date:ad.date,
            userID: ad.postedBy,
            username: ad.username,
            images: ad.images,
        })
    } catch ( error ){
        console.error(error)
    }
}