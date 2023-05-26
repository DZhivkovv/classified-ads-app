import Ad from '../models/adModel.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


export const saveAdvertisement = async (request, response, next) => {
  const { title, description, price, category, userID, username, isFreeShipping, isNew } = request.body;
  const images = request.files;

  try {
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );

    const ad = new Ad({
      title,
      description,
      price,
      category,
      postedBy: userID,
      username,
      images: imageUrls,
      isFreeShipping,
      isNew,
    });

    await ad.save();

    response.send({
      status: 200,
      message: "Ad saved successfully",
    });
  } catch (error) {
    response.send({
      status: 500,
      message: "Internal server error",
    });
  }
};
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
  const category = request.query.category || "";
  const page = parseInt(request.query.page || "0");
  const page_size = 4;   // Defines the number of ads to display per page

  try {
    let query = Ad.find();

    if (searchQuery.length) {
      query = query.or([{ title: { $regex: searchQuery, $options: "i" } }]);
    } else if (searchQuery.length === 0 && category.length === 0) {
      query = query.where("_id").equals(null); // Return no ads
    }

    if (category.length) {
      query = query.where("category").equals(category);
    }

    const totalAdsQuery = query.model.countDocuments(query.getFilter()); // Count the total number of ads based on the current query
    const adsQuery = query
      .skip(page_size * page)
      .limit(page_size);

    const [totalAds, ads] = await Promise.all([totalAdsQuery, adsQuery]);

    // Calculate the total number of pages based on the filtered ads count
    const totalPages = Math.ceil(totalAds / page_size);

    response.json({
      totalPages,
      ads, // Send the retrieved ads
    });
  } catch (error) {
    response.send({
      status:500,
      message:"Internal server error"
    })
  }
};