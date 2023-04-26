import React from "react";
import './UserProfile.scss'
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { username } = useParams();

  return (
    <div className="userProfile--container">
      <h1>User Profile: {username}</h1>
    </div>
  );
}