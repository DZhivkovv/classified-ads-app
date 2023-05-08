import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Ad from "../../components/Ad/Ad.jsx";
import './Ads.scss'

export default function Ads() {
    const [ads, setAds] = useState(null); // State for storing all ads
    const [searchedAds, setSearchedAds] = useState(null); // State for storing searched ads
    const [searchQuery, setSearchQuery] = useState(""); // State for storing search query

    useEffect(() => {
        // Fetch all ads when the component mounts
        fetch('http://localhost:3001/getAllAds')
            .then(response => response.json())
            .then(data => {
                setAds(data);
            });
    }, []);

    useEffect(() => {
        // Fetch searched ads when searchQuery changes
        fetch(`http://localhost:3001/searchAds?search=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => setSearchedAds(data));
    }, [searchQuery]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    return (
        <div className="ads--container">
            <Navbar
                links={['Home', 'Contact us']}
            />
            <section className="main-section">
                <div className="ads-search">
                    <form onSubmit={handleSearch}>
                        <input type="text" className="search-title" value={searchQuery} onChange={handleSearch} placeholder="Search" />
                        <button>Search</button>
                    </form>
                </div>
                <div className="all-ads">
                    {/* 
                    Render ads based on search results.
                    If no ads match the searched query, just display all ads in the database. Otherwise, display only the ads that match the query.
                    */}
                    {
                        searchedAds && searchedAds.length === 0 ? (
                            ads ? (
                                ads.map(ad => <Ad key={ad._id} id={ad._id} title={ad.title} description={ad.description} price={ad.price} username={ad.username} date={ad.date} images={ad.images[0]} />)
                            ) : null
                        ) : (
                            searchedAds && searchedAds.map(ad => <Ad key={ad._id} id={ad._id} title={ad.title} description={ad.description} price={ad.price} username={ad.username} date={ad.date} images={ad.images[0]} />)
                        )
                    }
                </div>
                <Link to='/addad' className="add-an-ad-btn">+</Link>
            </section>
        </div>
    );
}