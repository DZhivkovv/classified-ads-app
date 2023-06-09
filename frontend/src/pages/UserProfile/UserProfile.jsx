import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx'
import Ad from '../../components/Ad/Ad.jsx'
import './UserProfile.scss'
import { Oval } from  'react-loader-spinner'
import noProfilePic from '../../assets/AdPage/noProfilePic.png'

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  
  useEffect(()=>{
    fetch(`https://classified-ads-app.onrender.com/api/users/${id}`)
    .then(res => res.json())
    .then(data => setUser(data));
  }, [id]);

  if(!user){
    return <div className="loader-overlay">
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
            borderRadius: "15px"
          }}
        wrapperClassName="loader"
    />
    </div>

}

  return (
    <div className="profile-page-container">
      <Navbar
        links={['Ads', 'Contact us']}
      />
      <div className="userProfile-container">
        <div className="profile-upper">
          <img src={noProfilePic} alt="No profile pic provided"/>
          <h2 className="user-username">{user.username}</h2>

          <div className="info user-email">
              <i className="fa-solid fa-envelope"></i>
          </div>

        </div>
        <div className="profile-lower">
          <div className="profile-info">
            <h3>About the user:</h3>

            <div className="info user-location">
              <i class="fa-solid fa-city"></i>
              <p>From: {user.location || "Unknown"}</p>
            </div>

            <div className="info user-memberSince">
              <i class="fa-solid fa-clock"></i>
              <p>Member since: {user.memberSince.split("T")[0]}</p>
            </div>

            <div className="info user-adsNumber">
              <i class="fa-solid fa-list-ol"></i>
              <p className="user-adsNumber">Ads uploaded: {user.adCount}</p>
            </div>
          </div>


          <div className="profile-ads">
            <p className="profile-ads-heading">Latest ads from {user.username}:</p>
 
            <div className="ads-container">
              {
                user.userAds && user.userAds.length > 0 ? 
                user.userAds.map(ad => 
                <Ad 
                  key = {ad._id} 
                  id = {ad._id} 
                  title = {ad.title} 
                  price = {ad.price} 
                  username = {ad.username} 
                  date={ad.date} 
                  images = {ad.images[0]}
                />
                )
                :
                <p className="no-ads-message">This user has not uploaded any ads yet.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}