import React from "react";
import { Link } from 'react-router-dom'
import './SignUp.scss'

export default function SignUp(){
    const [user, setUser] = React.useState({
        email:"",
        username:"",
        password:"",
    })

    function handleChange(e){
        const {name, value} = e.target;
        setUser(prevUser => {
            return{
                ...prevUser,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            username: user.username,
            password: user.password,
            })
        });
    };

    return(
        <div className="signUp--container">
            <div className="form-box">
                <h1>Create account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-field">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required></input>
                        </div>

                        <div className="input-field">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" placeholder="Username" minLength={4} onChange={handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$" onChange={handleChange} required></input>
                            <p className="validation-msg">The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character from the set @$!%*?& and be at least 8 characters long.</p>
                        </div>
                    </div>
                    <button>Sign up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>

            </div>
        </div>
    )
}