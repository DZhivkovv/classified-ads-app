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
    try {
        // Defines the number of ads to display per page
        const page_size = 4;
    
        // Extracts the page number from the request query parameter, default to 0 if not provided
        const page = parseInt(request.query.page || "0");
    
        // Counts the total number of ads in the collection
        const total = await Ad.countDocuments({});
    
        // Retrieves the ads for the specified page using pagination
        const ads = await Ad.find().limit(page_size).skip(page_size * page);
    
        response.json({
            totalPages: Math.ceil(total / page_size),  // Calculate the total number of pages
            ads,  // Send the retrieved ads
        });
    } catch (error) {
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

export const searchAds = async (request, response, next) => {
        const searchQuery = request.query.search || "";
  
    try {
        const ads = await Ad.find({ $text: { $search: searchQuery } });
        response.json(ads)
    } catch(error){
        console.error(error)
  }
}