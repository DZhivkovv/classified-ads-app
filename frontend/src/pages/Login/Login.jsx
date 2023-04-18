import React from "react";
import { Link } from 'react-router-dom';
import './Login.scss';

export default function Login(){
    return(
        <div className="login--container">
            <div className="form-box">
                <h1>Sign in</h1>
                <form>
                    <div className="input-group">
                        <div className="input-field">
                            <i class="fa-solid fa-user"></i>
                            <input type="email" name="email" placeholder="Email"></input>
                        </div>

                        <div className="input-field">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Password"></input>
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