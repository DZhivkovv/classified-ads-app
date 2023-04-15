import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'
import logo from '../../assets/—Pngtree—corporate image logo free logo_1026060.png'

export default function Navbar(props){
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

            <Link to='/'>                
                <img src={logo} alt="A temporary logo until i make one" className="nav--elelment logo"/>
            </Link>
                {allLinks}
            </ul>
        </nav>
    )
}