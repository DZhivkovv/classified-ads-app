import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import './Ads.scss'

export default function Ads(){
    return(
        <div className="ads--container">
            <Navbar
                links={['Home', 'Contact us']}
            />
            <section className="ads--main-section">
                <h1>Ads</h1>       
                <Link to='/addad' className="add-an-ad-btn">+</Link>
            </section>
        </div>
    )
}