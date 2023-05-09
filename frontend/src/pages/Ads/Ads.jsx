import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Ad from "../../components/Ad/Ad.jsx";
import './Ads.scss'

export default function Ads() {
    const [ads, setAds] = useState(null); // State for storing all ads
    const [numberOfPages, setNumberOfPages] = useState(0);// State for storing the total number of pages 
    const [activePage, setActivePage] = useState(0);// State fpr storing the page number the user is on
    const [pageNumber, setPageNumber] = useState(0);
    const [searchedAds, setSearchedAds] = useState(null); // State for storing searched ads
    const [searchQuery, setSearchQuery] = useState(""); // State for storing search query


    const pages = new Array(numberOfPages).fill(null).map((v, i) => i); // Creates an array of page numbers from 0 to numberOfPages-1
    // Each element represents a page number
    
    const gotoPrevious = () => {
      setPageNumber(Math.max(0, pageNumber - 1));
      // Set the pageNumber state to the maximum value between 0 and pageNumber - 1
      // Ensures that the page number doesn't go below 0
    
      setActivePage(Math.max(0, pageNumber - 1));
      // Set the activePage state to the same value as pageNumber
      // Updates the active button to reflect the updated page number
    };
    
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      // Set the pageNumber state to the minimum value between numberOfPages - 1 and pageNumber + 1
      // Ensures that the page number doesn't exceed the total number of pages
    
      setActivePage(Math.min(numberOfPages - 1, pageNumber + 1));
      // Set the activePage state to the same value as pageNumber
      // Updates the active button to reflect the updated page number
    };

    useEffect(() => {
        // Fetch all ads when the component mounts
        fetch(`http://localhost:3001/getAllAds?page=${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                setAds(data.ads);
                setNumberOfPages(data.totalPages); 
            });
    }, [pageNumber]);

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
 
                <div className="pages-controller">
                    {/* Render the button to navigate to the previous page */}
                    <button onClick={gotoPrevious}><i class="fa-solid fa-up-long"></i></button>
                    {pages.map((pageIndex) => (
                        <button
                            key={pageIndex}
                            onClick={() => {
                            setPageNumber(pageIndex);
                            setActivePage(pageIndex);
                            }}
                            /* Apply the "active" class if the button's page index matches the activePage state */
                            className={activePage === pageIndex ? "active" : "pgsbtn"}
                        >
                        {/* Display the page number on the button */}
                        {pageIndex + 1}
                        </button>
                    ))}
                  {/* Render the button to navigate to the next page */}
                  <button onClick={gotoNext}><i class="fa-solid fa-down-long"></i></button>
                </div>
                <Link to='/addad' className="add-an-ad-btn">+</Link>
            </section>
        </div>
    );
}