import React from "react";
import { Link } from 'react-router-dom'
import './SignUp.scss'

export default function SignUp(){
    const [user, setUser] = React.useState({
        "email":"",
        "username":"",
        "password":"",
    })

    return(
        <div className="signUp--container">
            <div className="form-box">
                <h1>Create account</h1>
                <form>
                    <div className="input-group">
                        <div className="input-field">
                            <i class="fa-solid fa-user"></i>
                            <input type="email" name="email" placeholder="Email" required></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="text" name="username" placeholder="Username" minLength={4} required></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" required></input>
                            <p className="validation-msg">Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.</p>
                        </div>
                    </div>
                    <button>Sign up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>

            </div>
        </div>
    )
}