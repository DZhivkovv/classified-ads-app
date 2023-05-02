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
        dbAd.save();
        console.log("Ad saved successfully!");
    } catch(error){
        console.error(error)
    }
}