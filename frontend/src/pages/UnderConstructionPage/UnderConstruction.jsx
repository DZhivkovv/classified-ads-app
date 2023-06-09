import React from "react";
import './UnderConstruction.scss'
import underConstructionIcon from '../../assets/under_construction.png'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function UnderConstruction (){
    //// Will display instead of pages in the site that are not ready yet.
    return(
        <div className="underConstruction-container">
            <Navbar
            links={['Ads', 'Contact us']}
            />
            <div className="underConstruction-content">
                <img src={underConstructionIcon} alt="This page is not available yet."/>
                <h1>Page Under Construction</h1>
            </div>
            <Footer/>
        </div>

    )
}
