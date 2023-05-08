import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

// Component to handle user login
export default function Login(){
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate  = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/isUserAuth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => data.isLoggedIn === true ? navigate('/'): null)
    },[])

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

        await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            })
          })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('token', data.token)
            if(data.status === 200){
                navigate('/')
            }
        })
    }

    // Render login form
    return(
        <div className="login--container">
            <div className="form-box">
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-field">
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
                    <p>Don't have an account? <Link to='/register'>Create an account</Link></p>
                </div>
            </div>
        </div>
    )
}