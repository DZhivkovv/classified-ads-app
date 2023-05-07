import React, { useState, useEffect } from "react";
import './UserProfile.scss'
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const { id } = useParams();

  
  useEffect(()=>{
    fetch(`http://localhost:3001/api/users/${id}`)
    .then(res => res.json())
    .then(data => setUser(data));
  }, [id]);


  if(!user){
    return <div>Loading...</div>
}

  return (
    <div className="userProfile--container">
    </div>
  );
}