import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './AddAd.scss'

export default function AddClassifiedAd(){
    const [userInfo, setUserInfo] = useState(null)

    const [adData, setAdData] = useState({
        title: '',
        description: '',
        price: '',
        images:'',
      });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
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
        <div className="addAd--container">
            <form action="/advertisements" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    onChange={handleChange} 
                    required
                    />
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea 
                id="description" 
                name="description" 
                onChange={handleChange} 
                required
                />
            </div>
            <div>
                <label for="price">Price:</label>
                <input 
                type="number" 
                id="price" 
                name="price" 
                onChange={handleChange} 
                required
                />
            </div>
            <div>
                <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="images"
                onChange={handleImage}
                />
            </div>
            <button>Add advertisement</button>
            </form>
        </div>
    )
}