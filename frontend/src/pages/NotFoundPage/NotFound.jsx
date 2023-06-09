import React from "react";
import './NotFound.scss'
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'

export default function NotFound (){
    //Will display instead of pages that do not exist on this site.
    return(
        <div className="notFound-container">
            <Navbar
            links={['Ads', 'Contact us']}
            />
            <div className="notFound-text">
                <h1>Oops!</h1>
                <p>It seems you've stumbled upon a page that doesn't exist.</p>
            </div>
            <Footer/>
        </div>

    )
}
