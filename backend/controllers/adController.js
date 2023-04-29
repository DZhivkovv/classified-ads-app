import Ad from '../models/adModel.js'


export const saveAdvertisement = async (request, response, next) => {
    const {title, description, price, userID, username} = request.body;

    const dbAd = new Ad({
        title: title, 
        description: description,
        price: price,
        postedBy: userID,
    })

    try{
        dbAd.save();
        console.log("Ad saved successfully!");
    } catch(error){
        console.error(error)
    }
}