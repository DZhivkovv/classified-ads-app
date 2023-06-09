import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.jsx'
import './AddAd.scss'


import { Oval } from  'react-loader-spinner'

export default function AddClassifiedAd(){
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [adData, setAdData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Real Estate', //Default category value (it no category is selected it will be Real Estate)
        images:[],
        isFreeShipping: false,
        itemIsNew: false
      });

    const navigate = useNavigate();
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
          setAdData((prevAdData) => ({
            ...prevAdData,
            [name]: checked,
          }));
        } else {
          setAdData((prevAdData) => ({
            ...prevAdData,
            [name]: value,
          }));
        }
      };

    const handleImage = (e) => {
        const files = Array.from(e.target.files); 
        setAdData(prevAdData => ({ ...prevAdData,
            images: [...prevAdData.images, ...files]
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInfo) {
            console.error('userInfo is null');
            return;
        }

        setIsLoading(true)

        const formData = new FormData();
        formData.append('title',adData.title);
        formData.append('description',adData.description);
        formData.append('price',adData.price);
        formData.append('category',adData.category);
        formData.append('userID',userInfo.userID);
        formData.append('username',userInfo.username);
        for (let i = 0; i < adData.images.length; i++) {
            formData.append('images', adData.images[i]);
          }
        formData.append('isFreeShipping',adData.isFreeShipping);
        formData.append('itemIsNew',adData.itemIsNew);

        fetch('https://classified-ads-app.onrender.com/advertisements', {
          method: 'POST',
          body:formData
        })    
        .then(response => response.json())
        .then(data => data.status === 200 ? navigate('/ads?upload=success') : null);
    }

    useEffect(()=>{
        fetch('https://classified-ads-app.onrender.com/api/isUserAuth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserInfo({
                userID: data.userID,
                username: data.username,
            });
            return data.isLoggedIn === false ? navigate('/login') : null
        });
    },[])

      return(
        <div className="addAd-container">
            <Navbar links={['Ads', 'Contact us']}/>
            
            {/* Show loader while the ad is being uploaded to the database */}
            {isLoading && (
                <div className="loader-overlay">
                <Oval
                    height={100}
                    width={100}
                    radius={9}
                    color="rgb(218, 37, 218)"
                    ariaLabel="oval-loading"
                    wrapperStyle={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 9999,
                        backgroundColor: "rgb(232, 230, 230)", // Change the
                        borderRadius: "15px"
                      }}
                    wrapperClassName="loader"
                />
                </div>
            )}

            <div className="form-container">
                <form action="/advertisements" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-title">
                    <label for="title">Title: <span>*</span></label>
                    <input 
                        type="text"
                        placeholder="Maximum 100 symbols"
                        id="title" 
                        name="title" 
                        onChange={handleChange} 
                        required
                        />
                </div>
                <div className="form-description">
                    <label for="description">Description: <span>*</span></label>
                    <textarea 
                    id="description" 
                    placeholder="Maximum 500 symbols"
                    name="description" 
                    onChange={handleChange} 
                    required
                    />
                </div>
                <div className="form-price">
                    <label for="price">Price: <span>*</span></label>
                    <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    onChange={handleChange} 
                    required
                    />
                </div>
                <div className="form-image">
                    <button className={`imgbtn ${adData.images.length > 0 ? 'button-with-images' : ''}`}>
                    <i class="fa-solid fa-camera"></i>
                    </button>
                    <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="images"
                    onChange={handleImage}
                    multiple
                    />
                     {adData.images.length > 0 && (
                        //Paragraph that shows the number of selected images
                        <p>{`${adData.images.length} image${adData.images.length > 1 ? 's' : ''} selected`}</p>
                    )}
                </div>
                <div className="form-category">
                    <label for="category">Category:</label>
                    <select id="category" name="category" onChange={handleChange}>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home and Garden">Home and Garden</option>
                        <option value="Services">Services</option>
                        <option value="Jobs">Jobs</option>
                        <option value="Clothing and Shoes">Clothing and Shoes</option>
                        <option value="Pets">Pets</option>
                    </select>
                </div>
                <div className="form-freeShipping">
                    <label>
                    <input type="checkbox" name="isFreeShipping" onChange={handleChange}/>
                        Is shipping free?
                        <br/>
                        <span>
                            By marking this button, you are informing potential buyers that you will cover the shipping cost.
                        </span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="itemIsNew"
                            onChange={handleChange}
                        />
                        Is the item you are selling new?
                    </label>
                </div>
                <button className="add-ad-btn">Add advertisement</button>
                </form>
            </div>
        </div>
    )
}