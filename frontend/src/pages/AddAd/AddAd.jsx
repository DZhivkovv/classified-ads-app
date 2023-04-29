import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './AddAd.scss'

export default function AddClassifiedAd(){
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:3001/api/isUserAuth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => data.isLoggedIn === false ? navigate('/login') : null);
    },[])
    
      return(
        <div className="addAd--container">
            <form action="/advertisements" method="POST" onSubmit={handleSubmit}>
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
            <button>Add advertisement</button>
            </form>
        </div>
    )
}