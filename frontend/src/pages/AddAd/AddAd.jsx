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
            <p>Add an ad</p>
        </div>
    )
}