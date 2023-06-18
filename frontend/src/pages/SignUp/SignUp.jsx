import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Oval } from  'react-loader-spinner'
import './SignUp.scss'

export default function SignUp(){
    const [user, setUser] = useState({
        email:"",
        username:"",
        password:"",
        location: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://classified-ads-app.onrender.com/api/isUserAuth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => data.isLoggedIn ? navigate('/') : null)
    },[])

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
        setIsLoading(true);

        const response = await fetch('https://classified-ads-app.onrender.com/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            username: user.username,
            password: user.password,
            location: user.location,
            })
        });
        const data = await response
        if(data.status === 200){
            setIsLoading(false);
            navigate('/login');
        } else{
            setIsLoading(false);
        }
    };

    return(
        <div className="signUp--container">
            <div className="form-box">
                <h1>Create account</h1>
                {isLoading === true &&     
                <Oval
                    height={100}
                    width={100}
                    radius={9}
                    color="rgb(218, 37, 218)"
                    ariaLabel="oval-loading"
                    wrapperStyle={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 9999,
                        borderRadius: "15px"
                    }}
                    wrapperClassName="loader"
                />
                }

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
                        <div className="input-field">
                            <i className="fa-solid fa-city"></i>
                            <input type="text" name="location" placeholder="Where are you from" onChange={handleChange} ></input>
                        </div>
                    </div>
                    <button>Sign up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    )
}