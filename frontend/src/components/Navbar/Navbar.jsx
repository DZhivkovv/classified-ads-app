import React, { useRef } from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'
import logo from '../../assets/—Pngtree—corporate image logo free logo_1026060.png'
import userPhoto from '../../assets/Navbar/user.png'

export default function Navbar(props){
    //Create reference to the profile menu in navigation that will show and hide everytime the profile image is clicked 
    const elementRef = useRef(null);

    function handleClick(){
        elementRef.current.classList.toggle('hidden');
    }

    //Convert a string array passed as props in the Navbar component into links for the navigation bar
    const allLinks = props.links.map(
        link => 
        <li key={link} className = {"nav--element " + link.replace(/\s/g, '').toLowerCase()}>
            <Link to={link === 'Home' ? `/` : `/${link.replace(/\s/g, '').toLowerCase()}`}> 
                {link} 
            </Link>
        </li>   
    )

    return(
        <nav>
            <ul className="nav--container">
                {/* Left side of the navbar */}
                {/* A logo that redirects to homepage */}
                <Link to='/'>                
                    <img src={logo} alt="A temporary logo until i make one" className="nav--element logo"/>
                </Link>

                {/* Links created from the prop 'links' */}
                {allLinks}


                {/* Right side of the navbar */}
                {/* This part of the navigation will only be visible if the user is not logged into their account. */}                               
                <li className={props.successfulLogin? "hidden" : "nav--element login"}>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
                <li className = {props.successfulLogin? "hidden" : "nav--element signup"}>
                    <Link to='/signup'>
                        Sign up
                    </Link>
                </li>
               
                {/* This part of the navigation will only be visible if the user is logged into their account. */}                
                <li className= {props.successfulLogin?"nav--element loggedUser" : "hidden" }>
                    <div className="loggedUser--details">
                        <p className="loggedUser--username">{props.username}</p>
                        <img src={userPhoto} className="loggedUser--profile" alt="Profile pic of the user" onClick={handleClick}></img>

                        {/* This menu will be shown and hidden when the profile picture is clicked. */}
                        <div className="loggedUser--menu hidden" ref={elementRef}>
                            <div className="menu-item menu--profile">
                                <i className="fa-solid fa-user"></i>
                                <Link to='/your-profile'>Your profile</Link>
                            </div>
                            <div className="menu-item menu--inventory">
                                <i className="fa-solid fa-boxes-stacked"></i>
                                <Link to='/your-ads'>Your ads</Link>
                            </div>
                            <div className="menu-item menu--logout">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to='/logout'>Logout</Link>
                            </div>
                        </div>
                    </div> 
                </li>
            </ul>
        </nav>
    )
}