import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';

// Component to handle user login
export default function Login(){
    // Set initial user state
    const [user, setUser] = React.useState({
        email:"",
        password:""
    })
    const navigate  = useNavigate();
    const location = useLocation();
    // Check if signup was successful and set to state
    const successfulSignup = location.state?.successfulSignup

    // Handle changes to user input
    function handleChange(e){
        const {name, value} = e.target;
        setUser(prevUser => {
            return{
                ...prevUser,
                [name]:value
            }        
        })
    }

    // Handle form submission
    async function handleSubmit(e){
        e.preventDefault();

        // Send user credentials to server for login
        await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            })
        })
        .then( response => {
            // If login successful, navigate to home page and set state
            if(response.status === 200){
                response.json().then(content => {
                navigate('/', { state: { successfulLogin: true, userInfo: content.user} });
                })
            }
        }).catch(error => {
            console.error(error);
        })
    }

    // Render login form
    return(
        <div className="login--container">
            <div className="form-box">
                {/* Show success message if signup was successful */}
                <div className={successfulSignup ? "signup--success":"hidden"}>
                    <p>Successful signup! Please, login.</p>
                </div>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-field">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange}></input>
                        </div>

                        <div className="input-field">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" onChange={handleChange}></input>
                        </div>
                    </div>
                    <button>Sign in</button>
                </form>
                <div className="signup--message">
                    <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                </div>
            </div>
        </div>
    )
}