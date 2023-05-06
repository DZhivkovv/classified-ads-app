import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.jsx'
import './AddAd.scss'

export default function AddClassifiedAd(){
    const [userInfo, setUserInfo] = useState(null)

    const [adData, setAdData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Real Estate', //Default category value (it no category is selected it will be Real Estate)
        images:'',
      });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(adData)
        setAdData({
            ...adData,
            [name]:value
        })
    }
    const handleImage = (e) => {
        setAdData({
            ...adData,
            images: e.target.files[0]
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInfo) {
            console.error('userInfo is null');
            return;
          }

        const formData = new FormData();
        formData.append('title',adData.title);
        formData.append('description',adData.description);
        formData.append('price',adData.price);
        formData.append('category',adData.category);
        formData.append('userID',userInfo.userID);
        formData.append('username',userInfo.username);
        formData.append('images',adData.images);
        
        fetch('http://localhost:3001/advertisements', {
          method: 'POST',
          body:formData
        })    
        .then(response => response.json())
        .then(data => data.status === 200 ? navigate('/ads') : null);
    }

    useEffect(()=>{
        fetch('http://localhost:3001/api/isUserAuth',{
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
            <Navbar
                links={['Ads', 'Contact us']}
            />
            <div className="form-container">
                <form action="/advertisements" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-title">
                    <label for="title">Title: <span>*</span></label>
                    <input 
                        type="text" 
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
                    <button className="imgbtn">
                    <i class="fa-solid fa-camera"></i>
                    </button>
                    <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="images"
                    onChange={handleImage}
                    />
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

                <button className="add-ad-btn">Add advertisement</button>
                </form>
            </div>
        </div>
    )
}