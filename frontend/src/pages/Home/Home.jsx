import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroTile from "../../components/HeroTile/HeroTile";
import playstationImg from '../../assets/Home/playstation.png'
import carImg from '../../assets/Home/audi.png'
import shoesImg from '../../assets/Home/jordans.webp'
import ballImg from '../../assets/Home/soccer_ball.png'
import dogImg from '../../assets/Home/dog.png'
import houseImg from '../../assets/Home/house.png'
import toolsImg from '../../assets/Home/tools.png'
import './Home.scss'

export default function Home(){
    
    return(
        <div className="home--container">
            <Navbar
                links={['Ads', 'Contact us']}
            />

            <div className="home--hero-section">
                <h1>What are you looking for?</h1>

                <div className="hero--grid">
                    <HeroTile
                    tileNum = {1}
                    imgSrc = {playstationImg}
                    />
                    <HeroTile
                    tileNum = {2}
                    imgSrc={shoesImg}
                    />
                    <HeroTile
                    tileNum = {3}
                    imgSrc={ballImg}
                    />
                    <HeroTile
                    tileNum = {4}
                    imgSrc = {carImg}
                    />
                    <HeroTile
                    tileNum = {5}
                    imgSrc = {dogImg}
                    />
                    <HeroTile
                    tileNum = {6}
                    imgSrc={houseImg}
                    />
                    <HeroTile
                    tileNum = {7}
                    imgSrc={toolsImg}
                    />
                </div>
           </div>
        </div>
    )
}
