import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Ad from "../../components/Ad/Ad.jsx";
import './Ads.scss'

export default function Ads() {
    const [ads, setAds] = useState(null); // Stores all ads in the database


    //States and variables for searching and filtering ads
    const [searchedAds, setSearchedAds] = useState(""); // Stores the ads the user is specifically searching for (filtered ads)
    const [searchQuery, setSearchQuery] = useState(""); // Stores the search query
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
        setFilteredPageNumber(0); // Reset pageNumber to 0 for new search

    };
    const [category, setCategory] = useState(""); // Stores the category for filtering ads by category
    const [selectedCategory, setSelectedCategory] = useState(""); // Stores the selected category


    const categories = ['Real Estate', 'Vehicles', 'Electronics', 'Home and Garden', 'Services', 'Jobs', 'Clothing and Shoes', 'Pets']; //The categories an ad can be. This array is used to generate radio buttons for each element in the array.

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setCategory(category);
        setSelectedCategory(category);
      };
        

    //Pagination states, variables and functions
    const [numberOfPages, setNumberOfPages] = useState(0);// Stores the total number of pages 
    const [pageNumber, setPageNumber] = useState(0);
    const [activePage, setActivePage] = useState(0);// Stores the page number the user is on
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i); // Each element represents a page number for all ads
    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1)); //Set the pageNumber state to the maximum value between 0 and pageNumber - 1. Ensures that the page number doesn't go below 0 
        setActivePage(Math.max(0, pageNumber - 1)); // Set the activePage state to the same value as pageNumber. Updates the active button to reflect the updated page number
    }; 

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        // Set the pageNumber state to the minimum value between numberOfPages - 1 and pageNumber + 1
        // Ensures that the page number doesn't exceed the total number of pages
      
        setActivePage(Math.min(numberOfPages - 1, pageNumber + 1));
        // Set the activePage state to the same value as pageNumber
        // Updates the active button to reflect the updated page number
    };
  
    //Pagination for filtered ads
    const [filteredNumberOfPages, setFilteredNumberOfPages] = useState(0); //Stores the total number of pages for filtered ads
    const [filteredPageNumber, setFilteredPageNumber] = useState(0);
    const [filteredActivePage, setFilteredActivePage] = useState(0);// State for storing the page number the user is on
    const filteredPages = new Array(filteredNumberOfPages).fill(null).map((v, i) => i); // // Each element represents a page number for filtered ads

    const gotoFilteredPrevious = () => {
        setFilteredPageNumber(Math.max(0, filteredPageNumber - 1));
        // Set the pageNumber state to the maximum value between 0 and pageNumber - 1. Ensures that the page number doesn't go below 0 
        setFilteredActivePage(Math.max(0, filteredPageNumber - 1));
        // Set the activePage state to the same value as pageNumber. Updates the active button to reflect the updated page number
    };
  
    const gotoFilteredNext = () => {
        setFilteredPageNumber(Math.min(filteredNumberOfPages- 1, filteredPageNumber + 1));
        // Set the pageNumber state to the minimum value between numberOfPages - 1 and pageNumber + 1. Ensures that the page number doesn't exceed the total number of pages
        setFilteredActivePage(Math.min(filteredNumberOfPages - 1, filteredPageNumber + 1));
        // Set the activePage state to the same value as pageNumber. Updates the active button to reflect the updated page number
    };
      

    // Fetches all ads when the component mounts
    useEffect(() => {
        fetch(`http://localhost:3001/getAllAds?page=${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                setAds(data.ads);
                setNumberOfPages(data.totalPages); 
            });
    }, [pageNumber]);



    // Fetches searched ads according to search query, category or both (when the search query, category filter or filteredPageNumber changes)
    useEffect(() => {
        let url = `http://localhost:3001/searchAds?search=${encodeURIComponent(searchQuery)}`;
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        };
        url += `&page=${filteredPageNumber}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setSearchedAds(data.ads);
            setFilteredNumberOfPages(data.totalPages)
        });
    }, [searchQuery, category, filteredPageNumber]);


    return (
        <div className="ads--container">
            <Navbar
                links={['Home', 'Contact us']}
            />
            <section className="main-section">
                <div className="ads-search">
                    <form onSubmit={handleSearch}>

                    {/*Search bar for searching ads */}
                        <input
                            type="text"
                            className="search-title"
                            onChange={handleSearch}
                            placeholder="Search"
                        />

                        <div className="ads-search-categories">                    
                            <h3>Filter by category:</h3>
                            {/*Filter ads by categories */}
                            <div className="categories">
                                <label className="category-option">
                                <br/><br/>
                                <input
                                    type="radio"
                                    name="category"
                                    value=""
                                    className="categories-nofilter"
                                    checked={selectedCategory === ""}
                                    onChange={handleCategoryChange}
                                />
                                All Categories
                                </label>
                                {/*Render radio buttons for each category in categories array */}
                                {categories.map((category, index) => (
                                <label key={index} className="category-option">
                                    <input
                                    type="radio"
                                    name="category"
                                    className={category.toLowerCase()}
                                    value={category}
                                    checked={category === selectedCategory}
                                    onChange={handleCategoryChange}
                                    />
                                    {category}
                                </label>
                                ))}                        
                            </div>                
                        </div>
                    </form>
                </div>

        <div className="all-ads">
            {/* Render ads if there are no searched ads and no search query or selected category */}
            {searchedAds && searchedAds.length === 0 && searchQuery.length === 0 && selectedCategory.length === 0 && (
                ads ? (
                ads.map((ad) => (
                    <Ad
                    key={ad._id}
                    id={ad._id}
                    title={ad.title}
                    description={ad.description}
                    price={ad.price}
                    username={ad.username}
                    category={ad.category}
                    date={ad.date}
                    images={ad.images[0]}
                    freeShipping={ad.isFreeShipping}
                    />
                ))
                ) : null
            )}

            {/* Render "No ads found" message if there are no searched ads but there is a search query or selected category */}
            {searchedAds && searchedAds.length === 0 && (searchQuery.length !== 0 || selectedCategory.length !== 0) && (
                <p>No ads found.</p>
            )}

            {/* Render searched ads */}
            {searchedAds && searchedAds.length > 0 && searchedAds.map((ad) => (
                <Ad
                key={ad._id}
                id={ad._id}
                title={ad.title}
                description={ad.description}
                price={ad.price}
                username={ad.username}
                category={ad.category}
                date={ad.date}
                images={ad.images[0]}
                freeShipping={ad.isFreeShipping}
                />
            ))}
        </div>

        {/*Pagination for all ads*/}
        {searchedAds && searchedAds.length === 0 && (
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
        )}

        {/*Pagination for filtered ads */}
        {searchedAds && searchedAds.length > 0 && (
            <div className="pages-controller">
                {/* Render the button to navigate to the previous page */}
                <button onClick={gotoFilteredPrevious}><i class="fa-solid fa-up-long"></i></button>
                    
                {/*Page buttons*/}
                {filteredPages.map((pageIndex) => (
                    <button
                        key={pageIndex}
                        onClick={() => {
                        setFilteredPageNumber(pageIndex);
                        setFilteredActivePage(pageIndex);
                        }}
                        /* Apply the "active" class if the button's page index matches the activePage state */
                        className={filteredActivePage === pageIndex ? "active" : "pgsbtn"}>

                        {/* Display the page number on the button */}
                        {pageIndex + 1}
                
                    </button>
                ))}

                {/* Render the button to navigate to the next page */}
                    <button onClick={gotoFilteredNext}><i class="fa-solid fa-down-long"></i></button>
            </div>
            )}

            {/*Button for publishing an ad. It redirects to the ad publishing form.*/} 
            <Link to='/addad' className="add-an-ad-btn">+</Link>
        </section>
    </div>
    );
}