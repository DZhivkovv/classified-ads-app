import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroTile from "../../components/HeroTile/HeroTile";
import './Home.scss'

export default function Home(){
    
    return(
        <div className="home--container">
            <Navbar
                links={['Ads', 'Contact us']}
            />

            <div className="home--hero-section">
                <h1>What are you looking for today?</h1>

                <div className="hero--grid">
                    <HeroTile
                    tileNum = {1}
                    />
                    <HeroTile
                    tileNum = {2}
                    />
                    <HeroTile
                    tileNum = {3}
                    />
                    <HeroTile
                    tileNum = {4}
                    />
                    <HeroTile
                    tileNum = {5}
                    />
                    <HeroTile
                    tileNum = {6}
                    />
                    <HeroTile
                    tileNum = {7}
                    />
                </div>
           </div>
        </div>
    )
}