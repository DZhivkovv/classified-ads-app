import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login(){
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setUser(prevUser => {
            return{
                ...prevUser,
                [name]:value
            }        
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
    
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            })
        });
    }

    return(
        <div className="login--container">
            <div className="form-box">
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-field">
                            <i class="fa-solid fa-user"></i>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange}></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-lock"></i>
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