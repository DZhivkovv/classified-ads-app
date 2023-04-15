import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Home.scss'

export default function Home(){
    return(
        <div className="home--container">
            <Navbar
                links={['Ads', 'Contact us', 'Log In', 'Sign Up']}
            />
        </div>
    )
}