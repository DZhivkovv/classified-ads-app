import React from "react";
import { Link } from 'react-router-dom'
import './SignUp.scss'

export default function SignUp(){
    return(
        <div className="signUp--container">
            <div className="form-box">
                <h1>Create account</h1>
                <form>
                    <div className="input-group">
                        <div className="input-field">
                            <i class="fa-solid fa-user"></i>
                            <input type="email" name="email" placeholder="Email"></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="text" name="username" placeholder="Username"></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Password"></input>
                        </div>
                    </div>
                    <button>Sign up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>

            </div>
        </div>
    )
}