import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Ad from "../../components/Ad/Ad.jsx";
import './Ads.scss'

export default function Ads(){
    const [ads, setAds] = useState(null)

    useEffect(()=>{
        fetch('http://localhost:3001/getAllAds')
        .then(response => response.json())
        .then(data => {
            setAds(data)        
        })    
    },[])

    return(
        <div className="ads--container">
            <Navbar
                links={['Home', 'Contact us']}
            />
            <section className="ads--main-section">
                {
                    ads?
                    ads.map(ad => <Ad key = {ad._id} id = {ad._id} title = {ad.title} description = {ad.description} price = {ad.price} username = {ad.username} date={ad.date} images = {ad.images[0]}/>)
                    :
                    null
                }                
                <Link to='/addad' className="add-an-ad-btn">+</Link>
            </section>
        </div>
    )
}