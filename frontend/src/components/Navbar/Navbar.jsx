import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.scss'
import logo from '../../assets/—Pngtree—corporate image logo free logo_1026060.png'

export default function Navbar(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const allLinks = props.links.map(
        link => 
        <li key={link} className = {"nav--element " + link.replace(/\s/g, '').toLowerCase()}>
            <Link to={link === 'Home' ? `/` : `/${link.replace(/\s/g, '').toLowerCase()}`}> 
                {link} 
            </Link>
        </li>   
    )

    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('http://localhost:3001/api/isUserAuth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            setIsLoggedIn(data.isLoggedIn)
        })
    },[])

    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    
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